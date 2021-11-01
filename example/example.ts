/**
 * @author WMXPY
 * @namespace Example
 * @description Example
 */

import { HTTP_RESPONSE_CODE, WEB_SERVICE_DEVELOPMENT_PORT } from "@sudoo/magic";
import * as HTTP from "http";
import { ConnectionHandler, createNoSpecificProtocolConnectionEstablishRequirement, createPathMatchConnectionEstablishRequirement, MessageAgent, SocketServer } from "../src";
import { IMessageProxy } from "../src/declare/proxy";

const server = HTTP.createServer((_request: any, response: any) => {

    response.writeHead(HTTP_RESPONSE_CODE.NOT_FOUND);
    response.end();
});

server.listen(WEB_SERVICE_DEVELOPMENT_PORT.PRIMARY_LOWER_BASE, function () {

    console.log("Server is listening on port 3000");
});

const socket = SocketServer.create();
socket.setAuthorizationFunction((request: any) => {

    console.log(request);
    return "Hello World";
});

const handler: ConnectionHandler = ConnectionHandler.whenSatisfy(
    createNoSpecificProtocolConnectionEstablishRequirement(),
    createPathMatchConnectionEstablishRequirement('/'),
);

const agent: MessageAgent = MessageAgent.utf8((proxy: IMessageProxy, message: string) => {
    proxy.send(message);
});

handler.addMessageAgent(agent);
handler.addOnConnectionEstablishFunction((identifier: string, proxy: IMessageProxy) => {
    proxy.sendAsJson("Hello World");
});

socket.addConnectionHandler(handler);
socket.attach(server);
