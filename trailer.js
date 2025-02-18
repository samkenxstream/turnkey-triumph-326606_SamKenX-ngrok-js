//
// javascript trailer
//

const net = require('net');
const fs = require('fs');
const os = require('os');

async function defaultTunnel() {
  // set up a default session and tunnel
  var builder = new NgrokSessionBuilder();
  builder.authtokenFromEnv();
  var session = await builder.connect();
  var tunnel = await session.httpEndpoint().listen();
  tunnel.session = session; // surface to caller
  return tunnel;
}

// get a ngrok-connect socket, optionally passing in a pre-existing tunnel
async function getSocket(tunnel) {
  if (!tunnel) {
    tunnel = await defaultTunnel();
  }
  // use tcp socket with random local port
  const server = new net.Server();
  server.listen(0);
  // forward to this socket
  tunnel.forwardTcp('localhost:' + server.address().port);
  // surface to caller
  server.tunnel = tunnel;
  return server;
}

// bind a server to a ngrok tunnel, optionally passing in a pre-existing tunnel
async function ngrokListen(server, tunnel) {
  if (!tunnel) {
    tunnel = await defaultTunnel();
  }
  // todo: abstract socket on linux: https://stackoverflow.com/a/60014174
  // todo: named pipe on windows: https://nodejs.org/api/net.html#ipc-support

  // attempt unix socket
  ngrokLinkUnix(tunnel, server)
    .then(() => {})
    .catch(function(err) {
      console.debug("Using TCP socket. " + err);
      // fallback to tcp socket
      ngrokLinkTcp(tunnel, server);
    });

  server.tunnel = tunnel; // surface to caller
}

async function ngrokLinkTcp(tunnel, server) {
  // random local port
  server.listen(0);
  // forward to socket
  tunnel.forwardTcp('localhost:' + server.address().port);
}

async function ngrokLinkUnix(tunnel, server) {
  const proposed = "tun-" + tunnel.id() + ".sock";
  var filename;
  try {
    fs.accessSync(process.cwd(), fs.constants.W_OK);
    filename = proposed;
  } catch (err) {
    console.debug("Cannot write to: " + process.cwd());
    // try tmp. allow any exception to propagate
    fs.accessSync(os.tmpdir(), fs.constants.W_OK);
    filename = os.tmpdir() + proposed;
  }

  if (!filename) {
    throw new Error("no writeable directory found");
  }

  // begin listening
  server.listen({path: filename});
  // tighten permissions
  try {
    fs.chmodSync(filename, fs.constants.S_IRWXU);
  } catch (err) {
    console.debug("Cannot change permissions of file: " + filename);
  }
  // forward tunnel
  tunnel.forwardUnix(filename);
}

module.exports.getSocket = getSocket;
module.exports.listen = ngrokListen;
