/**
 * @author WMXPY
 * @namespace Socket
 * @description Declare
 */

export type ConnectionURL = {

    readonly href: string;
    readonly query: Record<string, string | string[]>;

    readonly auth?: string;
    readonly hash?: string;
    readonly host?: string;
    readonly hostname?: string;
    readonly path?: string;
    readonly pathname?: string;
    readonly protocol?: string;
    readonly search?: string;
    readonly slashes?: boolean;
    readonly port?: string;
};

export type ConnectionInformation = {

    readonly url: ConnectionURL;
    readonly origin: string;
    readonly userAgent: string;
    readonly websocketVersion: number;
};
export type ConnectionEstablishRequirement = (information: ConnectionInformation) => boolean;
export type OnConnectionCloseFunction = (reason: number, description: string) => void;

export type UTF8MessageHandler = (proxy: IMessageProxy, message: string) => void;
export type OnBinaryMessageHandler = (proxy: IMessageProxy, message: Buffer) => void;

export type MessageAgentOptions = {

    readonly onUTF8Message?: UTF8MessageHandler;
    readonly onBinaryMessage?: OnBinaryMessageHandler;
    readonly convertBufferToString?: boolean;
};

export type Stringifyable = {
    toString: (...args: any[]) => string;
};
export type AvailableSocketDataType = Stringifyable | Buffer;

export interface IMessageProxy {

    send(data: AvailableSocketDataType): any;
}
