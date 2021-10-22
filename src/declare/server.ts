/**
 * @author WMXPY
 * @namespace Socket_Declare
 * @description Server
 */

import { request as WebsocketRequest } from "websocket";

export type ServerIdentifierGenerationFunction = (request: WebsocketRequest) => string;
