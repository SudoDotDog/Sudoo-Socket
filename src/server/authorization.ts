/**
 * @author WMXPY
 * @namespace Socket_Server
 * @description Authorization
 */

import { SocketAuthorizationVerifyFunction } from "./declare";

export const AutoPassSocketServerAuthorizationFunction: SocketAuthorizationVerifyFunction<true> = () => {

    return true;
};
