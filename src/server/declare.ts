/**
 * @author WMXPY
 * @namespace Socket_Server
 * @description Declare
 */

import { ConnectionInformation } from "../declare/connection";

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


export type SocketServerAuthorizationRequest = {

    readonly type: 'bearer';
    readonly token: string;
} | {

    readonly type: 'basic';
    readonly username: string;
    readonly password: string;
} | {

    readonly type: 'plain';
    readonly token: string;
};

export type SocketAuthorizationVerifyFunction<Result = any> = (authorization: SocketServerAuthorizationRequest, connectionInformation: ConnectionInformation) => Promise<Result | null> | Result | null;
