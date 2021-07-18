/**
 * @author WMXPY
 * @namespace Socket_Declare
 * @description Response
 */

import { IMessageProxy } from "./proxy";

export type UTF8MessageHandler = (proxy: IMessageProxy, message: string) => void | Promise<void>;
export type BinaryMessageHandler = (proxy: IMessageProxy, message: Buffer) => void | Promise<void>;

export type MessageAgentOptions = {

    readonly onUTF8Message?: UTF8MessageHandler;
    readonly onBinaryMessage?: BinaryMessageHandler;

    readonly convertBufferToString?: boolean;
    readonly priority?: number;
};
