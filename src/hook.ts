/**
 * @author WMXPY
 * @namespace Socket
 * @description Hook
 */

import * as SocketIO from "socket.io";

export class SocketHook<T extends any[]> {

    public static create<T extends any[]>(): SocketHook<T> {

        return new SocketHook<T>();
    }

    private _beforeHook: null | ((socket: SocketIO.Socket, ...args: T) => (boolean | Promise<boolean>));
    private _afterHook: null | ((socket: SocketIO.Socket, ...args: T) => (void | Promise<void>));

    private constructor() {

        this._beforeHook = null;
        this._afterHook = null;
    }

    public before(func: (socket: SocketIO.Socket, ...args: T) => (boolean | Promise<boolean>)): this {

        this._beforeHook = func;
        return this;
    }

    public after(func: (socket: SocketIO.Socket, ...args: T) => (void | Promise<void>)): this {

        this._afterHook = func;
        return this;
    }

    public wrap(handler: any, ...args: T): any {

        const _this: this = this;

        return async (socket: SocketIO.Socket) => {

            if (_this._beforeHook) {

                const beforeHook = _this._beforeHook as (socket: SocketIO.Socket, ...args: T) => (boolean | Promise<boolean>);
                const isBeforeSucceed: boolean = await beforeHook(socket, ...args);

                if (!isBeforeSucceed) {
                    return;
                }
            }

            await Promise.resolve(handler());

            if (_this._afterHook) {

                const afterHook = _this._afterHook as (socket: SocketIO.Socket, ...args: T) => (void | Promise<void>);
                await afterHook(socket, ...args);
            }
        };
    }
}
