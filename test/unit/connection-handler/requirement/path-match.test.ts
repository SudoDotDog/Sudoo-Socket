/**
 * @author WMXPY
 * @namespace Socket_ConnectionHandler_Requirement
 * @description Path Match
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { ConnectionEstablishRequirement, createPathMatchConnectionEstablishRequirement } from "../../../../src";

describe('Given (Path Match) Connection Handler Creation Function', (): void => {

    const chance: Chance.Chance = new Chance('socket-connect-handler-requirement-path-match');

    it('should be able to create path match connection handler', (): void => {

        const handler: ConnectionEstablishRequirement = createPathMatchConnectionEstablishRequirement(chance.string());

        expect(handler).to.be.instanceof(Function);
    });
});
