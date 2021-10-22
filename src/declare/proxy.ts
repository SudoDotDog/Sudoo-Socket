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

    readonly identifier: string;
    readonly shouldContinue: boolean;

    send(data: AvailableSocketDataType): IMessageProxy;
    sendAsBuffer(data: any): IMessageProxy;
    sendAsJson<T extends any>(data: T): IMessageProxy;
    stopPropagation(): IMessageProxy;
}
