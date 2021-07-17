/**
 * @author WMXPY
 * @namespace Socket_Util
 * @description Extract
 */

import { Url } from "url";
import { request as WebsocketRequest } from "websocket";
import { ConnectionInformation, ConnectionURL } from "../declare";

const extractResourceURL = (original: Url): ConnectionURL => {

    const routes: string[] = [];
    if (typeof original.pathname === "string") {

        const splited: string[] = original.pathname.split("/");
        routes.push(...splited.slice(1));
    }

    const url: ConnectionURL = {

        href: original.href,
        routes,
        query: (typeof original.query === 'string'
            ? {}
            : {
                ...original.query as any,
            })
            ?? {},

        auth: original.auth ?? undefined,
        hash: original.hash ?? undefined,
        host: original.host ?? undefined,
        hostname: original.hostname ?? undefined,
        path: original.path ?? undefined,
        pathname: original.pathname ?? undefined,
        protocol: original.protocol ?? undefined,
        search: original.search ?? undefined,
        slashes: original.slashes ?? false,
        port: original.port ?? undefined
    };

    const entries: Array<[string, any]> = Object.entries(url);
    return entries.reduce(
        (
            previous: ConnectionURL,
            current: [string, any],
        ) => {

            if (typeof current[1] === 'undefined'
                || current[1] === null) {
                return previous;
            }

            return {
                ...previous,
                [current[0]]: current[1],
            };
        },
        {} as any as ConnectionURL,
    );
};

export const extractConnectionInformation = (request: WebsocketRequest): ConnectionInformation => {

    return {

        url: extractResourceURL(request.resourceURL),
        origin: request.origin,
        websocketVersion: request.webSocketVersion,
        userAgent: request.httpRequest.headers["user-agent"] as string,
    };
};
