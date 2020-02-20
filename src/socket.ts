/**
 * @author WMXPY
 * @namespace Socket
 * @description Socket
 */

import { HTTP_RESPONSE_CODE } from "@sudoo/magic";
import * as HTTP from "http";
import * as SocketIO from "socket.io";
import { SocketConnectHandler } from "./declare";

export class SocketConnection {

    public static create(path: string): SocketConnection {

        return new SocketConnection(path);
    }

    private readonly _transports: string[];
    private readonly _path: string;

    private _socket: SocketIO.Server | null = null;

    private _connectHandler: SocketConnectHandler | null = null;
    private _corsOrigin: string | null = null;
    private _corsHeaders: string[] | null = null;

    private constructor(path: string) {

        this._transports = ['websocket', 'htmlfile', 'xhr-polling', 'jsonp-polling', 'polling'];
        this._path = path;
    }

    public get socket(): SocketIO.Server | null {
        return this._socket;
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

    public start(server: HTTP.Server) {

        this._socket = SocketIO(server, {

            path: this._path,
            serveClient: false,
            handlePreflightRequest: this._buildPreflightRequestHandler(),
            transports: this._transports,
            origins: this._corsOrigin ? this._corsOrigin : undefined,

            cookie: false,
        });

        if (this._connectHandler) {
            this._socket.on('connection', this._connectHandler);
        }
    }

    private _buildPreflightRequestHandler(): any {

        const allowHeaders: string[] = [
            "Content-Type",
            ...this._corsHeaders,
        ];

        return (req: any, res: any) => {
            const headers = {
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Headers": allowHeaders.join(', '),
                "Access-Control-Allow-Origin": req.headers.origin,
            };
            res.writeHead(HTTP_RESPONSE_CODE.OK, headers);
            res.end();
        };
    }
}
