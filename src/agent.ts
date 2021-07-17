/**
 * @author WMXPY
 * @namespace Socket
 * @description Agent
 */

import { IMessageProxy, MessageAgentOptions, OnBinaryMessageHandler, UTF8MessageHandler } from "./declare";

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

    private _onUTF8Message?: UTF8MessageHandler;
    private _onBinaryMessage?: OnBinaryMessageHandler;

    private _convertBufferToString: boolean;

    private constructor() {

        this._convertBufferToString = false;
    }

    public onUTF8Message(messageHandler: UTF8MessageHandler): this {

        this._onUTF8Message = messageHandler;
        return this;
    }

    public onBinaryMessage(messageHandler: OnBinaryMessageHandler): this {

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