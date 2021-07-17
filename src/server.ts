/**
 * @author WMXPY
 * @namespace Socket
 * @description Socket
 */

import * as HTTP from "http";
import { connection as WebsocketConnection, request as WebsocketRequest, server as WebsocketServer } from "websocket";
import { ConnectionHandler } from "./connection-handler/connection-handler";
import { ConnectionInformation } from "./declare";
import { extractConnectionInformation } from "./util/extract";

export class SocketServer {

    public static create(): SocketServer {

        return new SocketServer();
    }

    private _socketServer?: WebsocketServer;
    private _mounted: boolean;

    private readonly _connectionHandlers: Set<ConnectionHandler>;
    private readonly _connections: Map<ConnectionHandler, Set<WebsocketConnection>>;

    private constructor() {

        this._mounted = false;

        this._connectionHandlers = new Set();
        this._connections = new Map();
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
        socketServer.on('request', this._onRequest.bind(this));

        this._socketServer = socketServer;
        return this;
    }

    public detach(): this {

        if (!this._mounted
            || !this._socketServer) {

            throw new Error("[Sudoo-Socket] SocketServer not mounted");
        }

        this._socketServer.shutDown();
        this._socketServer = undefined;
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

        const connectionInformation: ConnectionInformation = extractConnectionInformation(request);
        for (const handler of this._connectionHandlers) {

            if (handler.shouldEstablish(connectionInformation)) {

                const connection: WebsocketConnection = request.accept(null as any, request.origin);
                if (this._connections.has(handler)) {

                    (this._connections
                        .get(handler) as Set<WebsocketConnection>)
                        .add(connection);
                }
                handler.establish(connection);
                return this;
            }
        }

        request.reject();
        return this;
    }

    private _ensureServer(): WebsocketServer {

        if (!this._socketServer) {
            throw new Error("[Sudoo-Socket] SocketServer not mounted");
        }
        return this._socketServer;
    }
}
