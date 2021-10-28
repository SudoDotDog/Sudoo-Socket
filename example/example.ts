/**
 * @author WMXPY
 * @namespace Example
 * @description Example
 */

import * as HTTP from "http";
import { ConnectionHandler, createNoSpecificProtocolConnectionEstablishRequirement, createPathMatchConnectionEstablishRequirement, MessageAgent, SocketServer } from "../src";
import { IMessageProxy } from "../src/declare/proxy";

const server = HTTP.createServer(function (request: any, response: any) {

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    response.writeHead(404);
    response.end();
});

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
server.listen(3000, function () {

    console.log("Server is listening on port 3000");
});

const socket = SocketServer.create();
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
