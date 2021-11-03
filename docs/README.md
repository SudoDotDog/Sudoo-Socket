# Sudoo-Socket

[![Continuous Integration](https://github.com/SudoDotDog/Sudoo-Socket/actions/workflows/ci.yml/badge.svg)](https://github.com/SudoDotDog/Sudoo-Socket/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/SudoDotDog/Sudoo-Socket/branch/master/graph/badge.svg)](https://codecov.io/gh/SudoDotDog/Sudoo-Socket)
[![npm version](https://badge.fury.io/js/%40sudoo%2Fsocket.svg)](https://www.npmjs.com/package/@sudoo/socket)
[![downloads](https://img.shields.io/npm/dm/@sudoo/socket.svg)](https://www.npmjs.com/package/@sudoo/socket)

Socket Server for JS

## Install

```sh
yarn add @sudoo/socket
yarn add @sudoo/symbol # Peer Dependency
# Or
npm install @sudoo/socket --save
npm install @sudoo/symbol --save # Peer Dependency
```

## Example

```ts
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

```
