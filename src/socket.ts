/**
 * @author WMXPY
 * @namespace Socket
 * @description Socket
 */

import * as HTTP from 'http';

export class Socket {

    public static create(): Socket {
        return new Socket();
    }

    private readonly _connections: any[] = [];
    private _server?: HTTP.Server;

    private constructor() {

        this._connections = [];
    }

    public mount(server: HTTP.Server): this {

        this._server = server;
        server.on('upgrade', () => {
            console.log("test");
        });
        return this;
    }
}
