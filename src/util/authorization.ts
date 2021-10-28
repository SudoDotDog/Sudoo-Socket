/**
 * @author WMXPY
 * @namespace Socket_Util
 * @description Authorization
 */

import { SocketServerAuthorizationRequest } from "../server/declare";

export const extractSocketAuthorization = (authorizationHeader: string | null): SocketServerAuthorizationRequest => {

    if (typeof authorizationHeader !== 'string') {
        return {
            type: 'none',
        };
    }

    if (authorizationHeader.length <= 5) {
        return {
            type: 'none',
        };
    }

    if (authorizationHeader.startsWith('Bearer ')) {

        const token: string = authorizationHeader.substring(7);
        return {
            type: 'bearer',
            token,
        };
    }

    if (authorizationHeader.startsWith('Basic ')) {

        const token: string = authorizationHeader.substring(6);
        const splited: string[] = Buffer.from(token, 'base64').toString().split(':');
        return {
            type: 'basic',
            username: splited[0],
            password: splited[1],
        };
    }

    if (authorizationHeader.startsWith('Plain ')) {

        const token: string = authorizationHeader.substring(6);
        return {
            type: 'plain',
            token,
        };
    }

    return {
        type: 'none',
    };
};
