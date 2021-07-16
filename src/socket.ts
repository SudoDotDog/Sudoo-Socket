/**
 * @author WMXPY
 * @namespace Socket
 * @description Socket
 */

import { Server } from "socket.io";
// eslint-disable-next-line camelcase
import { Default_Transports_Protocol, SocketConnectHandler, TRANSPORTS_PROTOCOL } from "./declare";

export class SocketConnection {

    public static create(path: string): SocketConnection {

        return new SocketConnection(path);
    }

    private readonly _path: string;

    private _transports: TRANSPORTS_PROTOCOL[];
    private _socket: Server | null = null;

    private _connectHandler: SocketConnectHandler | null = null;
    private _corsOrigin: string | null = null;
    private _corsHeaders: string[] | null = null;

    private constructor(path: string) {

        // eslint-disable-next-line camelcase
        this._transports = Default_Transports_Protocol;
        this._path = path;
    }

    public get socket(): Server | null {
        return this._socket;
    }

    public setTransportsProtocols(transports: TRANSPORTS_PROTOCOL[]): this {

        this._transports = transports;
        return this;
    }

    public onConnect(func: SocketConnectHandler): this {

        this._connectHandler = func;
        return this;
    }

    public allowCors(origin: string = '*:*', ...extraHeaders: string[]): this {

        this._corsOrigin = origin;
        this._corsHeaders = extraHeaders;
        return this;
    }

    public start(httpServer: any): this {

        const corsAllowHeaders: string[] = [
            "Content-Type",
            ...this._corsHeaders || [],
        ];

        this._socket = new Server(httpServer, {

            path: this._path,
            serveClient: false,
            cors: {
                origin: this._corsOrigin ? this._corsOrigin : undefined,
                methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
                allowedHeaders: corsAllowHeaders,
                credentials: true,
            },
            transports: this._transports,
            cookie: false,
        });

        if (!this._socket) {
            throw new Error("[Sudoo-Socket] Undefined Socket Server");
        }

        if (this._connectHandler) {
            this._socket.on('connection', (socket: any) => {
                if (this._connectHandler) {
                    this._connectHandler(socket);
                }
            });
        }
        return this;
    }
}
