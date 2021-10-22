/**
 * @author WMXPY
 * @namespace Socket_Util
 * @description Emit Message
 */

import { connection as WebsocketConnection, Message } from "websocket";
import { MessageAsyncAgent, MessageProxy } from "..";
import { MessageAgent } from "../agent/agent";

export const triggerEmitMessage = async (identifier: string, messageAgents: MessageAgent[], connection: WebsocketConnection, message: Message): Promise<void> => {

    for (const messageAgent of messageAgents) {

        const proxy: MessageProxy = MessageProxy.create(connection, identifier);
        if (messageAgent instanceof MessageAsyncAgent) {

            if (message.type === 'utf8') {
                await messageAgent.emitUTF8Message(proxy, message.utf8Data);
            } else if (message.type === 'binary') {
                await messageAgent.emitBinaryMessage(proxy, message.binaryData);
            }
        } else {

            if (message.type === 'utf8') {
                messageAgent.emitUTF8Message(proxy, message.utf8Data);
            } else if (message.type === 'binary') {
                messageAgent.emitBinaryMessage(proxy, message.binaryData);
            }
        }

        if (!proxy.shouldContinue) {
            return;
        }
    }
    return;
};
