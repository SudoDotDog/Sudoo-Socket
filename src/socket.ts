/**
 * @author WMXPY
 * @namespace Socket
 * @description Socket
 */

import * as HTTP from 'http';
import * as Net from 'net';
import { SocketRequest } from './request';

export class Socket {

    public static create(): Socket {
        return new Socket();
    }

    private _mounted: boolean;

    private readonly _connections: any[] = [];

    private constructor() {

        this._mounted = false;

        this._connections = [];
    }

    public mount(server: HTTP.Server): this {

        if (this._mounted) {
            return this;
        }

        this._mounted = true;
        server.on('upgrade', this._upgradeConnection.bind(this));

        return this;
    }

    private _upgradeConnection(incomingMessage: HTTP.IncomingMessage, socket: Net.Socket): void {

        const request: SocketRequest = SocketRequest.create(incomingMessage, socket);

        console.log(request);
    }
}
