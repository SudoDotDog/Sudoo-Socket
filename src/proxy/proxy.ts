/**
 * @author WMXPY
 * @namespace Socket_Proxy
 * @description Proxy
 */

import { connection as WebsocketConnection } from "websocket";
import { AvailableSocketDataType, IMessageProxy } from "../declare/proxy";

export class MessageProxy implements IMessageProxy {

    public static create(connection: WebsocketConnection): MessageProxy {

        return new MessageProxy(connection);
    }

    private readonly _connection: WebsocketConnection;

    private _shouldContinue: boolean;

    private constructor(connection: WebsocketConnection) {

        this._connection = connection;

        this._shouldContinue = true;
    }

    public get shouldContinue(): boolean {
        return this._shouldContinue;
    }

    public send(data: AvailableSocketDataType): this {

        if (Buffer.isBuffer(data)) {

            this._connection.sendBytes(data);
            return this;
        }

        this._connection.sendUTF(data.toString());
        return this;
    }

    public sendAsBuffer(data: any): this {

        if (Buffer.isBuffer(data)) {

            this._connection.sendBytes(data);
            return this;
        }
        this._connection.sendBytes(Buffer.from(data));
        return this;
    }

    public sendAsJson<T extends any>(data: T): this {

        this._connection.sendUTF(JSON.stringify(data));
        return this;
    }

    public stopPropagation(): this {

        this._shouldContinue = false;
        return this;
    }
}
