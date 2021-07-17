/**
 * @author WMXPY
 * @namespace Socket
 * @description Socket
 */

import * as HTTP from "http";
import { request as WebsocketRequest, server as WebsocketServer } from "websocket";
import { ConnectionHandler } from "./connection-handler";

export class SocketServer {

    public static create(): SocketServer {
        return new SocketServer();
    }

    private _socketServer?: WebsocketServer;
    private _mounted: boolean;

    private readonly _connectionHandlers: Set<ConnectionHandler>;

    private constructor() {

        this._mounted = false;

        this._connectionHandlers = new Set();
    }

    public attach(server: HTTP.Server): this {

        if (this._mounted) {

            throw new Error("[Sudoo-Socket] SocketServer already mounted");
        }

        this._mounted = true;

        const socketServer: WebsocketServer = new WebsocketServer({
            httpServer: server,
            autoAcceptConnections: false,
        });
        socketServer.on('request', (request: WebsocketRequest) => {
            request.accept();
        });

        this._socketServer = socketServer;
        return this;
    }

    public detach(): this {

        if (!this._mounted
            || !this._socketServer) {

            throw new Error("[Sudoo-Socket] SocketServer not mounted");
        }

        this._socketServer.shutDown();
        this._socketServer = null;
        this._mounted = false;
        return this;
    }

    public addConnectionHandler(handler: ConnectionHandler): this {

        this._connectionHandlers.add(handler);
        return this;
    }

    public removeConnectionHandler(handler: ConnectionHandler): this {

        this._connectionHandlers.delete(handler);
        return this;
    }

    private _onRequest(request: WebsocketRequest): this {

        for (const handler of this._connectionHandlers) {

            request.httpRequest
        }
        return this;
    }

    private _ensureServer(): WebsocketServer {

        if (!this._socketServer) {
            throw new Error("[Sudoo-Socket] SocketServer not mounted");
        }
        return this._socketServer;
    }
}
