/**
 * @author WMXPY
 * @namespace Socket_Declare
 * @description Connection
 */

import { SocketAuthorizationVerifyFunction } from "../server/declare";
import { IMessageProxy } from "./proxy";

export type ConnectionURL = {

    readonly href: string;
    readonly routes: string[];
    readonly query: Record<string, string | string[]>;

    readonly auth?: string;
    readonly hash?: string;
    readonly host?: string;
    readonly hostname?: string;
    readonly path?: string;
    readonly pathname?: string;
    readonly protocol?: string;
    readonly search?: string;
    readonly slashes?: boolean;
    readonly port?: string;
};

export type ConnectionInformation = {

    readonly url: ConnectionURL;
    readonly origin: string;
    readonly protocol: string | null;
    readonly userAgent: string;
    readonly websocketVersion: number;
};

export type ConnectionEstablishRequirement<AuthorizationResult = any> = (authorization: AuthorizationResult, information: ConnectionInformation) => boolean;
export type OnConnectionEstablishFunction = (identifier: string, proxy: IMessageProxy) => void;
export type OnConnectionCloseFunction = (identifier: string, reason: number, description: string) => void;
