/**
 * @author WMXPY
 * @namespace Socket
 * @description Agent
 */

export type MessageAgentOptions = {

    readonly onUTF8Message?: (message: string) => void;
    readonly onBinaryMessage?: (message: Buffer) => void;
    readonly convertBufferToString?: boolean;
};

export class MessageAgent {

    public static create(options: MessageAgentOptions): MessageAgent {

        const agent: MessageAgent = new MessageAgent();

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

    private _onUTF8Message?: (message: string) => void;
    private _onBinaryMessage?: (message: Buffer) => void;

    private _convertBufferToString: boolean;

    private constructor() {

        this._convertBufferToString = false;
    }

    public onUTF8Message(messageHandler: (message: string) => void): this {

        this._onUTF8Message = messageHandler;
        return this;
    }

    public onBinaryMessage(messageHandler: (message: Buffer) => void): this {

        this._onBinaryMessage = messageHandler;
        return this;
    }

    public setConvertBufferToString(convert: boolean): this {

        this._convertBufferToString = convert;
        return this;
    }

    public emitUTF8Message(message: string): this {

        if (this._onUTF8Message) {
            this._onUTF8Message(message);
        }
        return this;
    }

    public emitBinaryMessage(message: Buffer): this {

        if (this._convertBufferToString) {
            this.emitUTF8Message(message.toString());
            return this;
        }

        if (this._onBinaryMessage) {
            this._onBinaryMessage(message);
        }
        return this;
    }
}
