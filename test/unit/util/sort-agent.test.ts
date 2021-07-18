/**
 * @author WMXPY
 * @namespace Socket_ConnectionHandler_Requirement
 * @description Path Match
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { MessageAgent, MessageAsyncAgent } from "../../../src";
import { sortMessageAgents } from "../../../src/util/sort-agents";

describe('Given [Sort-Agent] Helper Function', (): void => {

    const chance: Chance.Chance = new Chance('socket-util-sort-agent');

    it('should be able to sort default message agents', (): void => {

        const firstMessageAgent = MessageAgent.create({
            name: chance.string(),
        });
        const secondMessageAgent = MessageAsyncAgent.create({
            name: chance.string(),
        });
        const thirdMessageAgent = MessageAgent.create({
            name: chance.string(),
        });

        const sets: Set<MessageAgent> = new Set([

            firstMessageAgent,
            secondMessageAgent,
            thirdMessageAgent,
        ]);

        const sorted: MessageAgent[] = sortMessageAgents(sets);

        expect(sorted).to.be.deep.equal([
            firstMessageAgent,
            secondMessageAgent,
            thirdMessageAgent,
        ]);
    });

    it('should be able to sort default message agents with priority', (): void => {

        const firstMessageAgent = MessageAgent.create({
            name: chance.string(),
        });
        const secondMessageAgent = MessageAsyncAgent.create({
            name: chance.string(),
        });
        const thirdMessageAgent = MessageAgent.create({
            name: chance.string(),
            priority: 1,
        });

        const sets: Set<MessageAgent> = new Set([

            firstMessageAgent,
            secondMessageAgent,
            thirdMessageAgent,
        ]);

        const sorted: MessageAgent[] = sortMessageAgents(sets);

        expect(sorted).to.be.deep.equal([
            thirdMessageAgent,
            firstMessageAgent,
            secondMessageAgent,
        ]);
    });
});
