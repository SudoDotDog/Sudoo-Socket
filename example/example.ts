/**
 * @author WMXPY
 * @namespace Example
 * @description Example
 */

import { Socket } from "../src";
import * as HTTP from "http";

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

const socket = Socket.create();
socket.mount(server);
