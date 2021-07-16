/**
 * @author WMXPY
 * @namespace Socket
 * @description Request
 */

import * as HTTP from 'http';
import * as Net from 'net';
import { buildHttpSwitchingProtocolsHeader } from './http';
import { encryptAcceptKey } from './util';

export class SocketRequest {

    public static create(incomingMessage: HTTP.IncomingMessage, socket: Net.Socket): SocketRequest {

        return new SocketRequest(incomingMessage, socket);
    }

    private readonly _incomingMessage: HTTP.IncomingMessage;
    private readonly _socket: Net.Socket;

    private constructor(incomingMessage: HTTP.IncomingMessage, socket: Net.Socket) {

        this._incomingMessage = incomingMessage;
        this._socket = socket;
    }

    public getOrigin(): string {
        return this._incomingMessage.headers.origin as string;
    }

    public getResource(): string {
        return this._incomingMessage.url as string;
    }

    public getKey(): string {
        return this._incomingMessage.headers['sec-websocket-key'] as string;
    }

    public accept(): void {

        const acceptKey: string = encryptAcceptKey(this.getKey());
        const responseHeader: string = buildHttpSwitchingProtocolsHeader(acceptKey);


    }
}
