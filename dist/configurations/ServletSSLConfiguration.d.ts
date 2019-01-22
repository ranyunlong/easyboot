/// <reference types="node" />
export declare class ServletSSLConfiguration {
    constructor(configuration?: ServletSSLConfiguration);
    pfx?: string | Buffer | Array<string | Buffer | Object>;
    key?: string | Buffer | Array<Buffer | Object>;
    passphrase?: string;
    cert?: string | Buffer | Array<string | Buffer>;
    ca?: string | Buffer | Array<string | Buffer>;
    ciphers?: string;
    honorCipherOrder?: boolean;
    ecdhCurve?: string;
    clientCertEngine?: string;
    crl?: string | Buffer | Array<string | Buffer>;
    dhparam?: string | Buffer;
    secureOptions?: number;
    secureProtocol?: string;
    sessionIdContext?: string;
    handshakeTimeout?: number;
    requestCert?: boolean;
    rejectUnauthorized?: boolean;
    NPNProtocols?: string[] | Buffer[] | Uint8Array[] | Buffer | Uint8Array;
    ALPNProtocols?: string[] | Buffer[] | Uint8Array[] | Buffer | Uint8Array;
    SNICallback?: (servername: string, cb: (err: Error | null, ctx: SecureContext) => void) => void;
    sessionTimeout?: number;
    ticketKeys?: Buffer;
}
interface SecureContext {
    context: any;
}
export {};
