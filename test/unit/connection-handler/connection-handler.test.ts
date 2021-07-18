/**
 * @author WMXPY
 * @namespace Socket_ConnectionHandler
 * @description Connection Handler
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { ConnectionHandler } from "../../../src";

describe('Given {ConnectionHandler} Class', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance: Chance.Chance = new Chance('socket-connect-handler-connect-handler');

    it('should be able to construct', (): void => {

        const handler: ConnectionHandler = ConnectionHandler.allowAll();

        expect(handler).to.be.instanceof(ConnectionHandler);
    });
});
