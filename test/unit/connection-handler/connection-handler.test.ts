/**
 * @author WMXPY
 * @namespace Socket_ConnectionHandler
 * @description Connection Handler
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { ConnectionHandler, ConnectionInformation } from "../../../src";

describe('Given {ConnectionHandler} Class', (): void => {

    const chance: Chance.Chance = new Chance('socket-connect-handler-connect-handler');

    it('should be able to construct', (): void => {

        const handler: ConnectionHandler = ConnectionHandler.allowAll();

        expect(handler).to.be.instanceof(ConnectionHandler);
    });

    it('should be able to establish when allow all', (): void => {

        const handler: ConnectionHandler = ConnectionHandler.allowAll();

        const shouldEstablish = handler.shouldEstablish(chance.string() as any as ConnectionInformation);

        expect(shouldEstablish).to.be.true;
    });

    it('should be able to reject when allow nothing', (): void => {

        const handler: ConnectionHandler = ConnectionHandler.allowNothing();

        const shouldEstablish = handler.shouldEstablish(chance.string() as any as ConnectionInformation);

        expect(shouldEstablish).to.be.false;
    });
});
