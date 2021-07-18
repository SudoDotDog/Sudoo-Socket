/**
 * @author WMXPY
 * @namespace Socket_Declare
 * @description Connection
 */

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
    readonly userAgent: string;
    readonly websocketVersion: number;
};

export type ConnectionEstablishRequirement = (information: ConnectionInformation) => boolean;
export type OnConnectionCloseFunction = (reason: number, description: string) => void;
