/**
 * @author WMXPY
 * @namespace Socket_Server
 * @description Server
 */

import { HTTP_RESPONSE_CODE } from "@sudoo/magic";
import * as HTTP from "http";
import { connection as WebsocketConnection, request as WebsocketRequest, server as WebsocketServer } from "websocket";
import { ConnectionHandler } from "../connection-handler/connection-handler";
import { ConnectionInformation } from "../declare/connection";
import { ServerIdentifierGenerationFunction } from "../declare/server";
import { UUIDVersion1IdentifierGenerationFunction } from "../server/identifier";
import { extractSocketAuthorization } from "../util/authorization";
import { extractConnectionInformation } from "../util/extract";
import { AutoPassSocketServerAuthorizationFunction } from "./authorization";
import { SocketAuthorizationVerifyFunction, SocketServerAuthorizationRequest, SocketServerOptions } from "./declare";

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
    private _authorizationFunction: SocketAuthorizationVerifyFunction;

    private constructor(options: SocketServerOptions) {

        this._options = options;

        this._mounted = false;

        this._connectionHandlers = new Set();
        this._connections = new Map();

        this._identifierGenerationFunction = UUIDVersion1IdentifierGenerationFunction;
        this._authorizationFunction = AutoPassSocketServerAuthorizationFunction;
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
            this._onRequest(request);
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

    private async _onRequest(request: WebsocketRequest): Promise<void> {

        const connectionInformation: ConnectionInformation = extractConnectionInformation(request);
        const authorizationRequest: SocketServerAuthorizationRequest = extractSocketAuthorization(
            request.httpRequest.headers.authorization ?? null,
        );

        const authorizationResult: any | null = await Promise.resolve(
            this._authorizationFunction(authorizationRequest, connectionInformation),
        );

        if (authorizationResult === null) {

            request.reject(HTTP_RESPONSE_CODE.UNAUTHORIZED, "Unauthorized");
            return;
        }

        const identifier: string = this._identifierGenerationFunction(connectionInformation, request);

        for (const handler of this._connectionHandlers) {

            if (handler.shouldEstablish(authorizationResult, connectionInformation)) {

                const connection: WebsocketConnection = request.accept(
                    connectionInformation.protocol as any as string,
                    request.origin,
                    this._options.cookies,
                );

                if (this._connections.has(handler)) {
                    const ensureHandler: Set<WebsocketConnection> = this._connections.get(handler) as Set<WebsocketConnection>;
                    ensureHandler.add(connection);
                } else {
                    this._connections.set(handler, new Set());
                }

                handler.establish(identifier, connection);
                return;
            }
        }

        request.reject(HTTP_RESPONSE_CODE.NOT_FOUND, "Not Found");
        return;
    }
}
