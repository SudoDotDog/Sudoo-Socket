/**
 * @author WMXPY
 * @namespace Socket
 * @description Declare
 */

export type ConnectionInformation = {

    readonly origin: string;
};

export type ConnectionEstablishRequirement = (information: ConnectionInformation) => boolean;

