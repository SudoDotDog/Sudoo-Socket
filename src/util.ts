/**
 * @author WMXPY
 * @namespace Socket
 * @description Util
 */

import * as Crypto from "crypto";
import { WEBSOCKET_SHA_GUID } from "./declare";

export const encryptAcceptKey = (key: string): string => {

    const hash: Crypto.Hash = Crypto.createHash("sha1");
    hash.update(`${key}${WEBSOCKET_SHA_GUID}`);

    const acceptKey: string = hash.digest('base64');
    return acceptKey;
};
