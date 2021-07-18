/**
 * @author WMXPY
 * @namespace Socket_Declare
 * @description Response
 */

export type UTF8MessageHandler = (proxy: IMessageProxy, message: string) => void;
export type BinaryMessageHandler = (proxy: IMessageProxy, message: Buffer) => void;

export type MessageAgentOptions = {

    readonly onUTF8Message?: UTF8MessageHandler;
    readonly onBinaryMessage?: BinaryMessageHandler;
    readonly convertBufferToString?: boolean;
};

export type Stringifyable = {
    toString: (...args: any[]) => string;
};
export type AvailableSocketDataType = Stringifyable | Buffer;

export interface IMessageProxy {

    send(data: AvailableSocketDataType): any;
}
