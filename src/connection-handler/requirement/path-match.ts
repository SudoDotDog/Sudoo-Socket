/**
 * @author WMXPY
 * @namespace Socket_ConnectionHandler_Requirement
 * @description Path Match
 */

import { ConnectionEstablishRequirement, ConnectionInformation } from "../../declare/connection";

export const createPathMatchConnectionEstablishRequirement = (path: string): ConnectionEstablishRequirement => {

    return (information: ConnectionInformation): boolean => {

        if (!information.url.pathname) {
            return false;
        }
        return information.url.pathname === path;
    };
};
