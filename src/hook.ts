/**
 * @author WMXPY
 * @namespace Socket
 * @description Hook
 */

import * as SocketIO from "socket.io";
import { AfterHook, BeforeHook, HandlerHook } from "./declare";

export class SocketHook<T extends any[] = []> {

    public static create<T extends any[] = []>(): SocketHook<T> {

        return new SocketHook<T>();
    }

    private _beforeHook: null | BeforeHook<T>;
    private _afterHook: null | AfterHook<T>;

    private constructor() {

        this._beforeHook = null;
        this._afterHook = null;
    }

    public before(func: BeforeHook<T>): this {

        this._beforeHook = func;
        return this;
    }

    public after(func: AfterHook<T>): this {

        this._afterHook = func;
        return this;
    }

    public wrap(handler: HandlerHook<T>, socket: SocketIO.Socket, ...args: T): any {

        const _this: this = this;

        return async () => {

            if (_this._beforeHook) {

                const beforeHook = _this._beforeHook as BeforeHook<T>;
                const isBeforeSucceed: boolean = await beforeHook(socket, ...args);

                if (!isBeforeSucceed) {
                    return;
                }
            }

            await Promise.resolve(handler(socket, ...args));

            if (_this._afterHook) {

                const afterHook = _this._afterHook as AfterHook<T>;
                await afterHook(socket, ...args);
            }
        };
    }
}
