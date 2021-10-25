/**
 * @author WMXPY
 * @namespace Socket_Declare
 * @description Server
 */

import { request as WebsocketRequest } from "websocket";
import { ConnectionInformation } from "../declare/connection";

export type ServerIdentifierGenerationFunction = (connection: ConnectionInformation, request: WebsocketRequest) => string;
