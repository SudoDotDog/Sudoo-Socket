/**
 * @author WMXPY
 * @namespace Socket_Server
 * @description Declare
 */

export interface WebSocketCookie {
    name: string;
    value: string;
    path?: string | undefined;
    domain?: string | undefined;
    expires?: Date | undefined;
    maxage?: number | undefined;
    secure?: boolean | undefined;
    httponly?: boolean | undefined;
}

export type SocketServerOptions = {

    readonly cookies?: WebSocketCookie[];
};
