/**
 * @author WMXPY
 * @namespace Socket_Util
 * @description Extract
 */

import { Url } from "url";
import { request as WebsocketRequest } from "websocket";
import { ConnectionInformation, ConnectionURL } from "../declare";

const extractResourceURL = (original: Url): ConnectionURL => {

    return {

        href: original.href,
        query: (typeof original.query === 'string'
            ? {}
            : {
                ...original.query,
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
};

export const extractConnectionInformation = (request: WebsocketRequest): ConnectionInformation => {

    return {

        url: extractResourceURL(request.resourceURL),
        origin: request.origin,
        websocketVersion: request.webSocketVersion,
        userAgent: request.httpRequest.headers["user-agent"] as string,
    };
};
