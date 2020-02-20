/**
 * @author WMXPY
 * @namespace Socket
 * @description Declare
 */

import * as SocketIO from "socket.io";

export type SocketConnectHandler = (socket: SocketIO.Socket) => void | Promise<void>;
export type PreflightRequestHandler = (req: any, res: any) => void;
