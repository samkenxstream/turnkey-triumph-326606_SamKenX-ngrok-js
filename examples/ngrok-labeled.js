var UNIX_SOCKET = "/tmp/http.socket";
const fs = require('fs');
fs.unlinkSync(UNIX_SOCKET);

// make webserver
var http = require('http'); 
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'}); 
  res.write('Congrats you have a created an ngrok web server');
  res.end();
})
.listen(UNIX_SOCKET); // Server object listens on unix socket
console.log('Node.js web server at ' + UNIX_SOCKET + ' is running..');

// setup ngrok
var ngrok = require('@ngrok/ngrok');
builder = new ngrok.NgrokSessionBuilder();
builder.authtokenFromEnv()
  .metadata("Online in One Line");

builder.connect().then((session) => {
  http.ngrok_session = session; // prevent garbage collection
  session.labeledTunnel()
    .label("edge", "edghts_<edge_id>")
    .metadata("example tunnel metadata from nodejs")
    .listen().then((tunnel) => {
      http.tunnel = tunnel; // prevent garbage collection
      console.log("established tunnel at: " + JSON.stringify(tunnel.labels()))
      tunnel.forwardUnix(UNIX_SOCKET);
  })
}).await;
