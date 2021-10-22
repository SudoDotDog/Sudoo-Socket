/**
 * @author WMXPY
 * @namespace Socket_ConnectionHandler
 * @description Connection Handler
 */

import { connection as WebsocketConnection, Message } from "websocket";
import { MessageAgent } from "../agent/agent";
import { ConnectionEstablishRequirement, ConnectionInformation, OnConnectionCloseFunction, OnConnectionEstablishFunction } from "../declare/connection";
import { MessageProxy } from "../proxy/proxy";
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

    private readonly _onConnectionEstablishFunctions: Set<OnConnectionEstablishFunction>;
    private readonly _onConnectionCloseFunctions: Set<OnConnectionCloseFunction>;

    private constructor(requirements: ConnectionEstablishRequirement[]) {

        this._requirements = requirements;
        this._messageAgents = new Set<MessageAgent>();

        this._onConnectionEstablishFunctions = new Set<OnConnectionEstablishFunction>();
        this._onConnectionCloseFunctions = new Set<OnConnectionCloseFunction>();
    }

    public addMessageAgent(messageAgent: MessageAgent): this {

        this._messageAgents.add(messageAgent);
        return this;
    }

    public removeMessageAgent(messageAgent: MessageAgent): this {

        this._messageAgents.delete(messageAgent);
        return this;
    }

    public addOnConnectionEstablishFunction(onConnectionEstablishFunction: OnConnectionEstablishFunction): this {

        this._onConnectionEstablishFunctions.add(onConnectionEstablishFunction);
        return this;
    }

    public removeOnConnectionEstablishFunction(onConnectionEstablishFunction: OnConnectionEstablishFunction): this {

        this._onConnectionEstablishFunctions.delete(onConnectionEstablishFunction);
        return this;
    }

    public addOnConnectionCloseFunction(onConnectionCloseFunction: OnConnectionCloseFunction): this {

        this._onConnectionCloseFunctions.add(onConnectionCloseFunction);
        return this;
    }

    public removeOnConnectionCloseFunction(onConnectionCloseFunction: OnConnectionCloseFunction): this {

        this._onConnectionCloseFunctions.delete(onConnectionCloseFunction);
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

    public establish(identifier: string, connection: WebsocketConnection): this {

        connection.on('message', (data: Message) => {
            this._emitMessage(identifier, connection, data);
        });

        connection.on('close', (reason: number, description: string) => {
            this._triggerClose(identifier, reason, description);
        });

        this._triggerEstablish(identifier, connection);
        return this;
    }

    private async _emitMessage(identifier: string, connection: WebsocketConnection, message: Message): Promise<void> {

        const sortedAgents: MessageAgent[] = sortMessageAgents(this._messageAgents);
        triggerEmitMessage(identifier, sortedAgents, connection, message);
        return;
    }

    private _triggerEstablish(identifier: string, connection: WebsocketConnection): this {

        const proxy: MessageProxy = MessageProxy.create(connection, identifier);
        for (const onConnectionEstablishFunction of this._onConnectionEstablishFunctions) {
            onConnectionEstablishFunction(identifier, proxy);
        }
        return this;
    }

    private _triggerClose(identifier: string, reason: number, description: string): this {

        for (const onConnectionCloseFunction of this._onConnectionCloseFunctions) {
            onConnectionCloseFunction(identifier, reason, description);
        }
        return this;
    }
}
