/**
 * @author WMXPY
 * @namespace Socket
 * @description Declare
 */

import * as SocketIO from "socket.io";

export type SocketConnectHandler = (socket: SocketIO.Socket) => void | Promise<void>;
export type PreflightRequestHandler = (req: any, res: any) => void;

export type BeforeHook<T extends any[]> = ((socket: SocketIO.Socket, ...args: T) => (boolean | Promise<boolean>));
export type AfterHook<T extends any[]> = ((socket: SocketIO.Socket, ...args: T) => (void | Promise<void>));
