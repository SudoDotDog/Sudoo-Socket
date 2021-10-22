/**
 * @author WMXPY
 * @namespace Socket_Server
 * @description Identifier
 */

import { UUIDVersion1, UUIDVersion4 } from "@sudoo/uuid";
import { ServerIdentifierGenerationFunction } from "../declare/server";

export const UUIDVersion1IdentifierGenerationFunction: ServerIdentifierGenerationFunction = (): string => {

    const identifier: string = UUIDVersion1.generateString();
    return identifier;
};

export const UUIDVersion4IdentifierGenerationFunction: ServerIdentifierGenerationFunction = (): string => {

    const identifier: string = UUIDVersion4.generateString();
    return identifier;
};
