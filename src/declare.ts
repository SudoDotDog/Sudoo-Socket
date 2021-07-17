/**
 * @author WMXPY
 * @namespace Socket
 * @description Declare
 */

export type ConnectionInformation = {

    readonly origin: string;
};
export type ConnectionEstablishRequirement = (information: ConnectionInformation) => boolean;

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
