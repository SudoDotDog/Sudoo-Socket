/**
 * @author WMXPY
 * @namespace Socket
 * @description Connection Handler
 */

import { connection as WebsocketConnection, IMessage } from "websocket";
import { ConnectionEstablishRequirement, ConnectionInformation } from "./declare";

export class ConnectionHandler {

    public static whenSatisfy(requirement: ConnectionEstablishRequirement): ConnectionHandler {

        return new ConnectionHandler(requirement);
    }

    private readonly _requirement: ConnectionEstablishRequirement;

    private constructor(requirement: ConnectionEstablishRequirement) {

        this._requirement = requirement;
    }

    public shouldEstablish(connectionInformation: ConnectionInformation): boolean {

        return this._requirement(connectionInformation);
    }

    public establish(connection: WebsocketConnection): this {

        connection.on('message', (data: IMessage) => {
            connection.send(data);
        });
        return this;
    }
}
