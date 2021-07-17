/**
 * @author WMXPY
 * @namespace Socket
 * @description Connection Handler
 */

import { ConnectionEstablishRequirement } from "./declare";

export class ConnectionHandler {

    public static whenSatisfy(requirement: ConnectionEstablishRequirement): ConnectionHandler {

        return new ConnectionHandler(requirement);
    }

    private readonly _requirement: ConnectionEstablishRequirement;

    private constructor(requirement: ConnectionEstablishRequirement) {

        this._requirement = requirement;
    }
}
