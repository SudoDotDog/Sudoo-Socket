/**
 * @author WMXPY
 * @namespace Socket
 * @description Proxy
 */

import { connection as WebsocketConnection } from "websocket";
import { AvailableSocketDataType, IMessageProxy } from "../declare";

export class MessageProxy implements IMessageProxy {

    public static create(connection: WebsocketConnection): MessageProxy {

        return new MessageProxy(connection);
    }

    private readonly _connection: WebsocketConnection;

    private constructor(connection: WebsocketConnection) {

        this._connection = connection;
    }

    public send(data: AvailableSocketDataType): this {

        if (Buffer.isBuffer(data)) {

            this._connection.sendBytes(data);
            return this;
        }

        this._connection.sendUTF(data.toString());
        return this;
    }
}
