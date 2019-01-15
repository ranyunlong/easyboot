export class ServletSSLConfiguration {
    constructor(configuration?: ServletSSLConfiguration) {
        if (typeof configuration !== 'object' && Array.isArray(configuration)) return;
        Object.keys(configuration).forEach((key: keyof ServletSSLConfiguration) => {
            this[key] = configuration[key]
        })
    }
    public pfx?: string | Buffer | Array<string | Buffer | Object>;
    public key?: string | Buffer | Array<Buffer | Object>;
    public passphrase?: string;
    public cert?: string | Buffer | Array<string | Buffer>;
    public ca?: string | Buffer | Array<string | Buffer>;
    public ciphers?: string;
    public honorCipherOrder?: boolean;
    public ecdhCurve?: string;
    public clientCertEngine?: string;
    public crl?: string | Buffer | Array<string | Buffer>;
    public dhparam?: string | Buffer;
    public secureOptions?: number; // Value is a numeric bitmask of the `SSL_OP_*` options
    public secureProtocol?: string; // SSL Method, e.g. SSLv23_method
    public sessionIdContext?: string;
    public handshakeTimeout?: number;
    public requestCert?: boolean;
    public rejectUnauthorized?: boolean;
    public NPNProtocols?: string[] | Buffer[] | Uint8Array[] | Buffer | Uint8Array;
    public ALPNProtocols?: string[] | Buffer[] | Uint8Array[] | Buffer | Uint8Array;
    public SNICallback?: (servername: string, cb: (err: Error | null, ctx: SecureContext) => void) => void;
    public sessionTimeout?: number;
    public ticketKeys?: Buffer;
}

interface SecureContext {
    context: any;
}