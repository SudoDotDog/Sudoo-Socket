/**
 * @author WMXPY
 * @namespace Socket_Util
 * @description Sort Agents
 */

import { MessageAgent } from "../agent/agent";

export const sortMessageAgents = (messageAgents: Iterable<MessageAgent>): MessageAgent[] => {

    return [
        ...messageAgents,
    ].sort((a: MessageAgent, b: MessageAgent) => {

        if (a.priority > b.priority) {
            return -1;
        }
        if (a.priority < b.priority) {
            return 1;
        }
        return 0;
    });
};
