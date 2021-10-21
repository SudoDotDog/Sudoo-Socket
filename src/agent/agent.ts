/**
 * @author WMXPY
 * @namespace Socket_Agent
 * @description Agent
 */

import { IMessageProxy } from "../declare/proxy";
import { BinaryMessageHandler, JsonMessageHandler, MessageAgentOptions, UTF8MessageHandler } from "../declare/response";

export class MessageAgent {

    public static create(options?: MessageAgentOptions): MessageAgent {

        const agent: MessageAgent = new MessageAgent();

        if (!options) {
            return agent;
        }

        if (typeof options.name === 'string') {
            agent._name = options.name;
        }
        if (typeof options.priority === 'number') {
            agent._priority = options.priority;
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

    public static utf8(messageHandler: UTF8MessageHandler, name?: string, priority?: number): MessageAgent {

        return this.create({
            name,
            priority,
            convertBufferToString: true,
            onBinaryMessage: (proxy: IMessageProxy, message: Buffer): void | Promise<void> => {

                return messageHandler(proxy, message.toString('utf-8'));
            },
            onUTF8Message: messageHandler,
        });
    }

    public static json<T extends any = any>(messageHandler: JsonMessageHandler<T>, name?: string, priority?: number): MessageAgent {

        return this.utf8((proxy: IMessageProxy, message: string): void | Promise<void> => {

            return messageHandler(proxy, JSON.parse(message));
        }, name, priority);
    }

    public static binary(messageHandler: BinaryMessageHandler, name?: string, priority?: number): MessageAgent {

        return this.create({
            name,
            priority,
            convertBufferToString: false,
            onBinaryMessage: messageHandler,
            onUTF8Message: (proxy: IMessageProxy, message: string): void | Promise<void> => {

                return messageHandler(proxy, Buffer.from(message, 'utf-8'));
            },
        });
    }

    protected _name?: string;

    protected _priority: number;

    protected _convertBufferToString: boolean;

    protected _onUTF8Message?: UTF8MessageHandler;
    protected _onBinaryMessage?: BinaryMessageHandler;

    protected constructor() {

        this._convertBufferToString = false;
        this._priority = 0;
    }

    public get name(): string | undefined {
        return this._name;
    }

    public get priority(): number {
        return this._priority;
    }

    public onUTF8Message(messageHandler: UTF8MessageHandler): void {

        this._onUTF8Message = messageHandler;
        return;
    }

    public onBinaryMessage(messageHandler: BinaryMessageHandler): void {

        this._onBinaryMessage = messageHandler;
        return;
    }

    public setConvertBufferToString(convert: boolean): void {

        this._convertBufferToString = convert;
        return;
    }

    public emitUTF8Message(proxy: IMessageProxy, message: string): void {

        if (this._onUTF8Message) {
            this._onUTF8Message(proxy, message);
        }
        return;
    }

    public emitBinaryMessage(proxy: IMessageProxy, message: Buffer): void {

        if (this._convertBufferToString) {
            this.emitUTF8Message(proxy, message.toString());
            return;
        }

        if (this._onBinaryMessage) {
            this._onBinaryMessage(proxy, message);
        }
        return;
    }
}
