/**
 * @author WMXPY
 * @namespace Socket_Server
 * @description Server
 */

import * as HTTP from "http";
import { connection as WebsocketConnection, request as WebsocketRequest, server as WebsocketServer } from "websocket";
import { UUIDVersion1IdentifierGenerationFunction } from "..";
import { ConnectionHandler } from "../connection-handler/connection-handler";
import { ConnectionInformation } from "../declare/connection";
import { ServerIdentifierGenerationFunction } from "../declare/server";
import { extractConnectionInformation } from "../util/extract";
import { SocketServerOptions } from "./declare";

export class SocketServer {

    public static create(options: SocketServerOptions = {}): SocketServer {

        return new SocketServer(options);
    }

    private readonly _options: SocketServerOptions;

    private _socketServer?: WebsocketServer;
    private _mounted: boolean;

    private readonly _connectionHandlers: Set<ConnectionHandler>;
    private readonly _connections: Map<ConnectionHandler, Set<WebsocketConnection>>;

    private _identifierGenerationFunction: ServerIdentifierGenerationFunction;

    private constructor(options: SocketServerOptions) {

        this._options = options;

        this._mounted = false;

        this._connectionHandlers = new Set();
        this._connections = new Map();

        this._identifierGenerationFunction = UUIDVersion1IdentifierGenerationFunction;
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

    public setIdentifierGenerationFunction(identifierGenerationFunction: ServerIdentifierGenerationFunction): this {

        this._identifierGenerationFunction = identifierGenerationFunction;
        return this;
    }

    private _onRequest(request: WebsocketRequest): this {

        const connectionInformation: ConnectionInformation = extractConnectionInformation(request);
        const identifier: string = this._identifierGenerationFunction(connectionInformation, request);

        for (const handler of this._connectionHandlers) {

            if (handler.shouldEstablish(connectionInformation)) {

                const connection: WebsocketConnection = request.accept(connectionInformation.protocol as any as string, request.origin);
                if (this._connections.has(handler)) {

                    (this._connections
                        .get(handler) as Set<WebsocketConnection>)
                        .add(connection);
                }
                handler.establish(identifier, connection);
                return this;
            }
        }

        request.reject();
        return this;
    }
}
