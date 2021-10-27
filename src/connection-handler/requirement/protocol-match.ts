/**
 * @author WMXPY
 * @namespace Socket_ConnectionHandler_Requirement
 * @description Protocol Match
 */

import { ConnectionEstablishRequirement, ConnectionInformation } from "../../declare/connection";

export const createProtocolMatchConnectionEstablishRequirement = (protocol: string): ConnectionEstablishRequirement => {

    return (information: ConnectionInformation): boolean => {

        return information.protocol === protocol;
    };
};
