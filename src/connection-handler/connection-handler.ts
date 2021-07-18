/**
 * @author WMXPY
 * @namespace Socket_ConnectionHandler
 * @description Connection Handler
 */

import { connection as WebsocketConnection, IMessage } from "websocket";
import { MessageAgent } from "../agent/agent";
import { ConnectionEstablishRequirement, ConnectionInformation, OnConnectionCloseFunction } from "../declare/connection";
import { triggerEmitMessage } from "../util/emit-message";
import { sortMessageAgents } from "../util/sort-agents";

export class ConnectionHandler {

    public static allowAll(): ConnectionHandler {

        return this.whenSatisfy();
    }

    public static allowNothing(): ConnectionHandler {

        return this.whenSatisfy(() => false);
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
            this._emitMessage(connection, data);
        });

        connection.on('close', (reason: number, description: string) => {
            this._triggerClose(reason, description);
        });
        return this;
    }

    private async _emitMessage(connection: WebsocketConnection, message: IMessage): Promise<void> {

        const sortedAgents: MessageAgent[] = sortMessageAgents(this._messageAgents);
        triggerEmitMessage(sortedAgents, connection, message);
        return;
    }

    private _triggerClose(reason: number, description: string): this {

        if (this._onConnectionClose) {
            this._onConnectionClose(reason, description);
        }
        return this;
    }
}
