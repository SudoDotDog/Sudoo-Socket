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

            throw new Error("[Sudoo-Socket] SocketServer already mounted");
        }

        this._mounted = true;

        this._socketServer = new WebsocketServer({
            httpServer: server,
            autoAcceptConnections: false,
        });
        return this;
    }

    public detach(): this {

        if (!this._mounted || !this._socketServer) {
            throw new Error("[Sudoo-Socket] SocketServer not mounted");
        }

        this._socketServer.shutDown();
        this._socketServer = null;
        this._mounted = false;
        return this;
    }

    private _ensureServer(): WebsocketServer {

        if (!this._socketServer) {
            throw new Error("[Sudoo-Socket] SocketServer not mounted");
        }
        return this._socketServer;
    }
}
