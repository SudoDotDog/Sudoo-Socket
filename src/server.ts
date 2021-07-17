/**
 * @author WMXPY
 * @namespace Socket
 * @description Socket
 */

export class SocketServer {

    public static create(): SocketServer {
        return new SocketServer();
    }

    private _mounted: boolean;

    private constructor() {

        this._mounted = false;
    }
}
