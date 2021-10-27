/**
 * @author WMXPY
 * @namespace Socket_Proxy
 * @description Proxy
 */

import { connection as WebsocketConnection } from "websocket";
import { AvailableSocketDataType, IMessageProxy } from "../declare/proxy";

export class MessageProxy implements IMessageProxy {

    public static create(connection: WebsocketConnection, identifier: string): MessageProxy {

        return new MessageProxy(connection, identifier);
    }

    private readonly _identifier: string;
    private readonly _connection: WebsocketConnection;

    private _shouldContinue: boolean;

    private constructor(connection: WebsocketConnection, identifier: string) {

        this._connection = connection;
        this._identifier = identifier;

        this._shouldContinue = true;
    }

    public get shouldContinue(): boolean {
        return this._shouldContinue;
    }
    public get identifier(): string {
        return this._identifier;
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

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        this._connection.sendBytes(Buffer.from(data));
        return this;
    }

    public sendAsJson<T>(data: T): this {

        this._connection.sendUTF(JSON.stringify(data));
        return this;
    }

    public stopPropagation(): this {

        this._shouldContinue = false;
        return this;
    }
}
