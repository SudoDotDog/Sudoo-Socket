/**
 * @author WMXPY
 * @namespace Socket_Declare
 * @description Proxy
 */

export type Stringifyable = {
    toString: (...args: any[]) => string;
};
export type AvailableSocketDataType = Stringifyable | Buffer;

export interface IMessageProxy {

    readonly shouldContinue: boolean;

    send(data: AvailableSocketDataType): IMessageProxy;
    stopPropagation(): IMessageProxy;
}
