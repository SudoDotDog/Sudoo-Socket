/* eslint-disable camelcase */
/**
 * @author WMXPY
 * @namespace Socket
 * @description Declare
 */

import * as SocketIO from "socket.io";

export enum TRANSPORTS_PROTOCOL {

    WEBSOCKET = "websocket",
    POLLING = "polling",
}

export const Default_Transports_Protocol: TRANSPORTS_PROTOCOL[] = [

    TRANSPORTS_PROTOCOL.WEBSOCKET,
    TRANSPORTS_PROTOCOL.POLLING,
];

export type SocketConnectHandler = (socket: SocketIO.Socket) => void | Promise<void>;
export type PreflightRequestHandler = (req: any, res: any) => void;

export type BeforeHook<T extends any[]> = (socket: SocketIO.Socket, ...args: T) => (boolean | Promise<boolean>);
export type BeforeWithMessageHook<T extends any[]> = (socket: SocketIO.Socket, message: string, ...args: T) => (boolean | Promise<boolean>);
export type HandlerHook<T extends any[]> = (socket: SocketIO.Socket, ...args: T) => any;
export type HandlerWithMessageHook<T extends any[]> = (socket: SocketIO.Socket, message: string, ...args: T) => any;
export type AfterHook<T extends any[]> = (socket: SocketIO.Socket, ...args: T) => (void | Promise<void>);
export type AfterWithMessageHook<T extends any[]> = (socket: SocketIO.Socket, message: string, ...args: T) => (void | Promise<void>);
