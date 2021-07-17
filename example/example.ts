/**
 * @author WMXPY
 * @namespace Example
 * @description Example
 */

import * as HTTP from "http";
import { ConnectionHandler, ConnectionInformation, SocketServer } from "../src";

const server = HTTP.createServer(function (request: any, response: any) {

    console.log(request.url);
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
    (information: ConnectionInformation) => {
        console.log(information);
        return false;
    },
);
socket.addConnectionHandler(handler);
socket.attach(server);
