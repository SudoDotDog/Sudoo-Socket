/**
 * @author WMXPY
 * @namespace Socket_Declare
 * @description Response
 */

import { IMessageProxy } from "./proxy";

export type UTF8MessageHandler = (proxy: IMessageProxy, message: string) => void | Promise<void>;
export type JsonMessageHandler<T extends any = any> = (proxy: IMessageProxy, message: T) => void | Promise<void>;
export type BinaryMessageHandler = (proxy: IMessageProxy, message: Buffer) => void | Promise<void>;

export type MessageAgentOptions = {

    readonly name?: string;
    readonly priority?: number;

    readonly convertBufferToString?: boolean;

    readonly onUTF8Message?: UTF8MessageHandler;
    readonly onBinaryMessage?: BinaryMessageHandler;
};
