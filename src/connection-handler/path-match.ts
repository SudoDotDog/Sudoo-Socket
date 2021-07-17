/**
 * @author WMXPY
 * @namespace Socket_ConnectionHandler
 * @description Path Match
 */

import { ConnectionEstablishRequirement, ConnectionInformation } from "../declare";

export const createPathMatchConnectionEstablishRequirement = (path: string): ConnectionEstablishRequirement => {

    return (information: ConnectionInformation): boolean => {

        if (!information.url.pathname) {
            return false;
        }
        return information.url.pathname === path;
    };
};
