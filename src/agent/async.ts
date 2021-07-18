/**
 * @author WMXPY
 * @namespace Socket_Agent
 * @description Async
 */

import { IMessageProxy } from "../declare/proxy";
import { BinaryMessageHandler, MessageAgentOptions, UTF8MessageHandler } from "../declare/response";
import { MessageAgent } from "./agent";

export class MessageAsyncAgent extends MessageAgent {

    public static create(options?: MessageAgentOptions): MessageAsyncAgent {

        const agent: MessageAsyncAgent = new MessageAsyncAgent();

        if (!options) {
            return agent;
        }

        if (options.convertBufferToString) {
            agent.setConvertBufferToString(true);
        }
        if (options.onUTF8Message) {
            agent.onUTF8Message(options.onUTF8Message);
        }
        if (options.onBinaryMessage) {
            agent.onBinaryMessage(options.onBinaryMessage);
        }
        if (typeof options.priority === 'number') {
            agent._priority = options.priority;
        }

        return agent;
    }

    public static utf8(messageHandler: UTF8MessageHandler, priority?: number): MessageAsyncAgent {

        const agent: MessageAsyncAgent = new MessageAsyncAgent();
        agent.setConvertBufferToString(true);
        agent.onUTF8Message(messageHandler);

        if (typeof priority === 'number') {
            agent._priority = priority;
        }

        return agent;
    }

    public static binary(messageHandler: BinaryMessageHandler, priority?: number): MessageAsyncAgent {

        const agent: MessageAsyncAgent = new MessageAsyncAgent();
        agent.setConvertBufferToString(false);
        agent.onUTF8Message((proxy: IMessageProxy, message: string) => {
            messageHandler(proxy, Buffer.from(message, 'utf-8'));
        });
        agent.onBinaryMessage(messageHandler);

        if (typeof priority === 'number') {
            agent._priority = priority;
        }

        return agent;
    }

    private constructor() {

        super();
    }

    public async emitUTF8Message(proxy: IMessageProxy, message: string): Promise<void> {

        if (this._onUTF8Message) {
            await Promise.resolve(this._onUTF8Message(proxy, message));
        }
        return;
    }

    public async emitBinaryMessage(proxy: IMessageProxy, message: Buffer): Promise<void> {

        if (this._convertBufferToString) {
            Promise.resolve(this.emitUTF8Message(proxy, message.toString()));
            return;
        }

        if (this._onBinaryMessage) {
            Promise.resolve(this._onBinaryMessage(proxy, message));
        }
        return;
    }
}
