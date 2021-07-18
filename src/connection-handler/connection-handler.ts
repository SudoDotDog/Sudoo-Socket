/**
 * @author WMXPY
 * @namespace Socket_ConnectionHandler
 * @description Connection Handler
 */

import { connection as WebsocketConnection, IMessage } from "websocket";
import { MessageAgent } from "../agent/agent";
import { MessageAsyncAgent } from "../agent/async";
import { ConnectionEstablishRequirement, ConnectionInformation, OnConnectionCloseFunction } from "../declare/connection";
import { MessageProxy } from "../proxy/proxy";

export class ConnectionHandler {

    public static allowAll(): ConnectionHandler {

        return this.whenSatisfy();
    }

    public static whenSatisfy(...requirements: ConnectionEstablishRequirement[]): ConnectionHandler {

        return new ConnectionHandler(requirements);
    }

    private readonly _requirements: ConnectionEstablishRequirement[];
    private readonly _messageAgents: Set<MessageAgent>;

    private _onConnectionClose?: OnConnectionCloseFunction;

    private constructor(requirements: ConnectionEstablishRequirement[]) {

        this._requirements = requirements;
        this._messageAgents = new Set<MessageAgent>();
    }

    public addMessageAgent(messageAgent: MessageAgent): this {

        this._messageAgents.add(messageAgent);
        return this;
    }

    public removeMessageAgent(messageAgent: MessageAgent): this {

        this._messageAgents.delete(messageAgent);
        return this;
    }

    public onConnectionClose(onConnectionClose: OnConnectionCloseFunction): this {

        this._onConnectionClose = onConnectionClose;
        return this;
    }

    public shouldEstablish(connectionInformation: ConnectionInformation): boolean {

        for (const requirement of this._requirements) {

            if (!requirement(connectionInformation)) {
                return false;
            }
        }
        return true;
    }

    public establish(connection: WebsocketConnection): this {

        connection.on('message', (data: IMessage) => {
            this._triggerMessage(connection, data);
        });

        connection.on('close', (reason: number, description: string) => {
            this._triggerClose(reason, description);
        });
        return this;
    }

    private async _triggerMessage(connection: WebsocketConnection, message: IMessage): Promise<void> {

        const sortedAgents: MessageAgent[] = this._getSortedAgents();
        for (const messageAgent of sortedAgents) {

            const proxy: MessageProxy = MessageProxy.create(connection);
            if (messageAgent instanceof MessageAsyncAgent) {

                if (message.type === 'utf8') {
                    await messageAgent.emitUTF8Message(proxy, message.utf8Data as string);
                } else if (message.type === 'binary') {
                    await messageAgent.emitBinaryMessage(proxy, message.binaryData as Buffer);
                }
            } else {

                if (message.type === 'utf8') {
                    messageAgent.emitUTF8Message(proxy, message.utf8Data as string);
                } else if (message.type === 'binary') {
                    messageAgent.emitBinaryMessage(proxy, message.binaryData as Buffer);
                }
            }

            if (!proxy.shouldContinue) {
                return;
            }
        }
        return;
    }

    private _triggerClose(reason: number, description: string): this {

        if (this._onConnectionClose) {
            this._onConnectionClose(reason, description);
        }
        return this;
    }

    private _getSortedAgents(): MessageAgent[] {

        return [
            ...this._messageAgents,
        ].sort((a: MessageAgent, b: MessageAgent) => {

            if (a.priority > b.priority) {
                return 1;
            }
            if (a.priority < b.priority) {
                return -1;
            }
            return 0;
        });
    }
}
