/**
 * @author WMXPY
 * @namespace Socket
 * @description Connection Handler
 */

import { connection as WebsocketConnection, IMessage } from "websocket";
import { MessageAgent } from "./agent";
import { ConnectionEstablishRequirement, ConnectionInformation } from "./declare";

export class ConnectionHandler {

    public static whenSatisfy(requirement: ConnectionEstablishRequirement): ConnectionHandler {

        return new ConnectionHandler(requirement);
    }

    private readonly _requirement: ConnectionEstablishRequirement;
    private readonly _messageAgents: Set<MessageAgent>;

    private constructor(requirement: ConnectionEstablishRequirement) {

        this._requirement = requirement;
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

    public shouldEstablish(connectionInformation: ConnectionInformation): boolean {

        return this._requirement(connectionInformation);
    }

    public establish(connection: WebsocketConnection): this {

        connection.on('message', (data: IMessage) => {

            this._triggerMessage(data);
        });
        return this;
    }

    private _triggerMessage(message: IMessage): this {

        for (const messageAgent of this._messageAgents) {

            if (message.type === 'utf8') {

                messageAgent.emitUTF8Message(message.utf8Data as string);
            } else if (message.type === 'binary') {

                messageAgent.emitBinaryMessage(message.binaryData as Buffer);
            }
        }
        return this;
    }
}
