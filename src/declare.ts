/**
 * @author WMXPY
 * @namespace Socket
 * @description Declare
 */

import * as HTTP from "http";

export type ConnectionEstablishRequirement = (incomingMessage: HTTP.IncomingMessage) => boolean;

