/**
 * @author WMXPY
 * @namespace Socket
 * @description Connection Manager
 */

import { SocketConnection } from "./connection";

export class SocketConnectionManager {

    private static _instance?: SocketConnectionManager;

    public static getInstance(): SocketConnectionManager {

        if (!this._instance) {

            this._instance = new SocketConnectionManager();
        }
        return this._instance;
    }

    private readonly _connections: Set<SocketConnection>;

    private constructor() {

        this._connections = new Set();
    }

    public addConnection(connection: SocketConnection): this {

        this._connections.add(connection);
        return this;
    }

    public removeConnection(connection: SocketConnection): this {

        this._connections.delete(connection);
        return this;
    }
}
