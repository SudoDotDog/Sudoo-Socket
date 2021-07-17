/**
 * @author WMXPY
 * @namespace Socket_Util
 * @description Extract
 */
import { request as WebsocketRequest } from "websocket";
import { ConnectionInformation } from "../declare";

export const extractConnectionInformation = (request: WebsocketRequest): ConnectionInformation => {

    return {

        origin: request.origin,
    };
};
