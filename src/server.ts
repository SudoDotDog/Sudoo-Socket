/**
 * @author WMXPY
 * @namespace Socket
 * @description Socket
 */

import * as HTTP from "http";
import { server as WebsocketServer } from "websocket";

export class SocketServer {

    public static create(): SocketServer {
        return new SocketServer();
    }

    private _socketServer?: WebsocketServer;

    private _mounted: boolean;

    private constructor() {

        this._mounted = false;
    }

    public attach(server: HTTP.Server): this {

        if (this._mounted) {
            return this;
        }

        this._mounted = true;

        this._socketServer = new WebsocketServer({
            httpServer: server,
            autoAcceptConnections: false,
        });
        return this;
    }
}
