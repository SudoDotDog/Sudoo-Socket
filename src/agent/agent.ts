/**
 * @author WMXPY
 * @namespace Socket_Agent
 * @description Agent
 */

import { IMessageProxy, MessageAgentOptions, BinaryMessageHandler, UTF8MessageHandler } from "../declare/response";

export class MessageAgent {

    public static create(options?: MessageAgentOptions): MessageAgent {

        const agent: MessageAgent = new MessageAgent();

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

        return agent;
    }

    public static utf8(messageHandler: UTF8MessageHandler): MessageAgent {

        const agent: MessageAgent = new MessageAgent();
        agent.setConvertBufferToString(true);
        agent.onUTF8Message(messageHandler);

        return agent;
    }

    public static binary(messageHandler: BinaryMessageHandler): MessageAgent {

        const agent: MessageAgent = new MessageAgent();
        agent.setConvertBufferToString(false);
        agent.onUTF8Message((proxy: IMessageProxy, message: string) => {
            messageHandler(proxy, Buffer.from(message, 'utf-8'));
        });
        agent.onBinaryMessage(messageHandler);

        return agent;
    }

    private _onUTF8Message?: UTF8MessageHandler;
    private _onBinaryMessage?: BinaryMessageHandler;

    private _convertBufferToString: boolean;

    private constructor() {

        this._convertBufferToString = false;
    }

    public onUTF8Message(messageHandler: UTF8MessageHandler): this {

        this._onUTF8Message = messageHandler;
        return this;
    }

    public onBinaryMessage(messageHandler: BinaryMessageHandler): this {

        this._onBinaryMessage = messageHandler;
        return this;
    }

    public setConvertBufferToString(convert: boolean): this {

        this._convertBufferToString = convert;
        return this;
    }

    public emitUTF8Message(proxy: IMessageProxy, message: string): this {

        if (this._onUTF8Message) {
            this._onUTF8Message(proxy, message);
        }
        return this;
    }

    public emitBinaryMessage(proxy: IMessageProxy, message: Buffer): this {

        if (this._convertBufferToString) {
            this.emitUTF8Message(proxy, message.toString());
            return this;
        }

        if (this._onBinaryMessage) {
            this._onBinaryMessage(proxy, message);
        }
        return this;
    }
}
