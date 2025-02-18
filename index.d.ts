/* tslint:disable */
/* eslint-disable */

/* auto-generated by NAPI-RS */

/**
 * turn on tracing subscriber which obeys NGROK_LOG env variable, e.g.:
 * process.env.NGROK_LOG = 'ngrok=debug';
 * ngrok.tracingSubscriber();
 */
export function tracingSubscriber(): void
/** The builder for an ngrok session. */
export class NgrokSessionBuilder {
  /** Create a new session builder */
  constructor()
  /** Authenticate the ngrok session with the given authtoken. */
  authtoken(authtoken: string): this
  /**
   * Authenticate using the authtoken in the `NGROK_AUTHTOKEN` environment
   * variable.
   */
  authtokenFromEnv(): this
  /**
   * Set the heartbeat interval for the session.
   * This value determines how often we send application level
   * heartbeats to the server go check connection liveness.
   */
  heartbeatInterval(heartbeatInterval: number): this
  /**
   * Set the heartbeat tolerance for the session.
   * If the session's heartbeats are outside of their interval by this duration,
   * the server will assume the session is dead and close it.
   */
  heartbeatTolerance(heartbeatTolerance: number): this
  /**
   * Use the provided opaque metadata string for this session.
   * Viewable from the ngrok dashboard or API.
   */
  metadata(metadata: string): this
  /** Connect to the provided ngrok server address. */
  serverAddr(addr: string): this
  /** Attempt to establish an ngrok session using the current configuration. */
  connect(): Promise<NgrokSession>
}
/** An ngrok session. */
export class NgrokSession {
  /** Start building a tunnel backing an HTTP endpoint. */
  httpEndpoint(): NgrokHttpTunnelBuilder
  /** Start building a tunnel backing a TCP endpoint. */
  tcpEndpoint(): NgrokTcpTunnelBuilder
  /** Start building a tunnel backing a TLS endpoint. */
  tlsEndpoint(): NgrokTlsTunnelBuilder
  /** Start building a labeled tunnel. */
  labeledTunnel(): NgrokLabeledTunnelBuilder
}
/**r" An ngrok tunnel backing an HTTP endpoint. */
export class NgrokHttpTunnel {
  /** The URL that this tunnel backs. */
  url(): string
  /** The protocol of the endpoint that this tunnel backs. */
  proto(): string
  /** The ID of this tunnel, assigned by the remote server. */
  id(): string
  /** Forward incoming tunnel connections to the provided TCP address. */
  forwardTcp(addr: string): Promise<void>
  /** Forward incoming tunnel connections to the provided Unix socket path. */
  forwardUnix(addr: string): Promise<void>
}
/**r" An ngrok tunnel backing a TCP endpoint. */
export class NgrokTcpTunnel {
  /** The URL that this tunnel backs. */
  url(): string
  /** The protocol of the endpoint that this tunnel backs. */
  proto(): string
  /** The ID of this tunnel, assigned by the remote server. */
  id(): string
  /** Forward incoming tunnel connections to the provided TCP address. */
  forwardTcp(addr: string): Promise<void>
  /** Forward incoming tunnel connections to the provided Unix socket path. */
  forwardUnix(addr: string): Promise<void>
}
/**r" An ngrok tunnel bcking a TLS endpoint. */
export class NgrokTlsTunnel {
  /** The URL that this tunnel backs. */
  url(): string
  /** The protocol of the endpoint that this tunnel backs. */
  proto(): string
  /** The ID of this tunnel, assigned by the remote server. */
  id(): string
  /** Forward incoming tunnel connections to the provided TCP address. */
  forwardTcp(addr: string): Promise<void>
  /** Forward incoming tunnel connections to the provided Unix socket path. */
  forwardUnix(addr: string): Promise<void>
}
/**r" A labeled ngrok tunnel. */
export class NgrokLabeledTunnel {
  /** The labels this tunnel was started with. */
  labels(): Record<string, string>
  /** The ID of this tunnel, assigned by the remote server. */
  id(): string
  /** Forward incoming tunnel connections to the provided TCP address. */
  forwardTcp(addr: string): Promise<void>
  /** Forward incoming tunnel connections to the provided Unix socket path. */
  forwardUnix(addr: string): Promise<void>
}
/**r" An ngrok tunnel backing an HTTP endpoint. */
export class NgrokHttpTunnelBuilder {
  /**
   * The scheme that this edge should use.
   * Defaults to [Scheme::HTTPS].
   */
  scheme(scheme: string): this
  /** The domain to request for this edge. */
  domain(domain: string): this
  /** Certificates to use for client authentication at the ngrok edge. */
  mutualTlsca(mutualTlsca: Uint8Array): this
  /** Enable gzip compression for HTTP responses. */
  compression(): this
  /** Convert incoming websocket connections to TCP-like streams. */
  websocketTcpConversion(): this
  /**
   * Reject requests when 5XX responses exceed this ratio.
   * Disabled when 0.
   */
  circuitBreaker(circuitBreaker: number): this
  /** with_request_header adds a header to all requests to this edge. */
  requestHeader(name: string, value: string): this
  /** with_response_header adds a header to all responses coming from this edge. */
  responseHeader(name: string, value: string): this
  /** with_remove_request_header removes a header from requests to this edge. */
  removeRequestHeader(name: string): this
  /** with_remove_response_header removes a header from responses from this edge. */
  removeResponseHeader(name: string): this
  /**
   * Credentials for basic authentication.
   * If not called, basic authentication is disabled.
   */
  basicAuth(username: string, password: string): this
  /**
   * OAuth configuration.
   * If not called, OAuth is disabled.
   */
  oauth(provider: string, allowEmails: Array<string>, allowDomains: Array<string>, scopes: Array<string>): this
  /**
   * OIDC configuration.
   * If not called, OIDC is disabled.
   */
  oidc(issuerUrl: string, clientId: string, clientSecret: string, allowEmails: Array<string>, allowDomains: Array<string>, scopes: Array<string>): this
  /**
   * WebhookVerification configuration.
   * If not called, WebhookVerification is disabled.
   */
  webhookVerification(provider: string, secret: string): this
  /** Tunnel-specific opaque metadata. Viewable via the API. */
  metadata(metadata: string): this
  /** Begin listening for new connections on this tunnel. */
  listen(): Promise<NgrokHttpTunnel>
  /**
   * Restriction placed on the origin of incoming connections to the edge to only allow these CIDR ranges.
   * Call multiple times to add additional CIDR ranges.
   */
  allowCidrString(cidr: string): this
  /**
   * Restriction placed on the origin of incoming connections to the edge to deny these CIDR ranges.
   * Call multiple times to add additional CIDR ranges.
   */
  denyCidrString(cidr: string): this
  /** The version of PROXY protocol to use with this tunnel, None if not using. */
  proxyProto(proxyProto: string): this
  /**
   * Tunnel backend metadata. Viewable via the dashboard and API, but has no
   * bearing on tunnel behavior.
   */
  forwardsTo(forwardsTo: string): this
}
/**r" An ngrok tunnel backing a TCP endpoint. */
export class NgrokTcpTunnelBuilder {
  /** The TCP address to request for this edge. */
  remoteAddr(remoteAddr: string): this
  /** Tunnel-specific opaque metadata. Viewable via the API. */
  metadata(metadata: string): this
  /** Begin listening for new connections on this tunnel. */
  listen(): Promise<NgrokTcpTunnel>
  /**
   * Restriction placed on the origin of incoming connections to the edge to only allow these CIDR ranges.
   * Call multiple times to add additional CIDR ranges.
   */
  allowCidrString(cidr: string): this
  /**
   * Restriction placed on the origin of incoming connections to the edge to deny these CIDR ranges.
   * Call multiple times to add additional CIDR ranges.
   */
  denyCidrString(cidr: string): this
  /** The version of PROXY protocol to use with this tunnel, None if not using. */
  proxyProto(proxyProto: string): this
  /**
   * Tunnel backend metadata. Viewable via the dashboard and API, but has no
   * bearing on tunnel behavior.
   */
  forwardsTo(forwardsTo: string): this
}
/**r" An ngrok tunnel backing a TLS endpoint. */
export class NgrokTlsTunnelBuilder {
  /** The domain to request for this edge. */
  domain(domain: string): this
  /** Certificates to use for client authentication at the ngrok edge. */
  mutualTlsca(mutualTlsca: Uint8Array): this
  /** The key to use for TLS termination at the ngrok edge in PEM format. */
  keyPem(keyPem: Uint8Array): this
  /**
   * The certificate to use for TLS termination at the ngrok edge in PEM
   * format.
   */
  certPem(certPem: Uint8Array): this
  /** Tunnel-specific opaque metadata. Viewable via the API. */
  metadata(metadata: string): this
  /** Begin listening for new connections on this tunnel. */
  listen(): Promise<NgrokTlsTunnel>
  /**
   * Restriction placed on the origin of incoming connections to the edge to only allow these CIDR ranges.
   * Call multiple times to add additional CIDR ranges.
   */
  allowCidrString(cidr: string): this
  /**
   * Restriction placed on the origin of incoming connections to the edge to deny these CIDR ranges.
   * Call multiple times to add additional CIDR ranges.
   */
  denyCidrString(cidr: string): this
  /** The version of PROXY protocol to use with this tunnel, None if not using. */
  proxyProto(proxyProto: string): this
  /**
   * Tunnel backend metadata. Viewable via the dashboard and API, but has no
   * bearing on tunnel behavior.
   */
  forwardsTo(forwardsTo: string): this
}
/**r" A labeled ngrok tunnel. */
export class NgrokLabeledTunnelBuilder {
  /** Tunnel-specific opaque metadata. Viewable via the API. */
  metadata(metadata: string): this
  /** Begin listening for new connections on this tunnel. */
  listen(): Promise<NgrokLabeledTunnel>
  /** Add a label, value pair for this tunnel. */
  label(label: string, value: string): this
}
