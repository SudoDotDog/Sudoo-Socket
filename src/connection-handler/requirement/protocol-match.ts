/**
 * @author WMXPY
 * @namespace Socket_ConnectionHandler_Requirement
 * @description Protocol Match
 */

import { ConnectionEstablishRequirement, ConnectionInformation } from "../../declare/connection";

export const createProtocolMatchConnectionEstablishRequirement = <AuthorizationResult = any>(protocol: string): ConnectionEstablishRequirement<AuthorizationResult> => {

    return (_authorizationResult: AuthorizationResult, information: ConnectionInformation): boolean => {

        return information.protocol === protocol;
    };
};

export const createNoSpecificProtocolConnectionEstablishRequirement = <AuthorizationResult = any>(): ConnectionEstablishRequirement<AuthorizationResult> => {

    return (_authorizationResult: AuthorizationResult, information: ConnectionInformation): boolean => {

        return information.protocol === null;
    };
};
