/**
 * @author WMXPY
 * @namespace Socket
 * @description Declare
 */

import * as SocketIO from "socket.io";

export type SocketConnectHandler = (socket: SocketIO.Socket) => void | Promise<void>;
