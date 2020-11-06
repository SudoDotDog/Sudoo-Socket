/**
 * @author WMXPY
 * @namespace Socket
 * @description Hook
 */

import * as SocketIO from "socket.io";
import { AfterHook, AfterWithMessageHook, BeforeHook, BeforeWithMessageHook, HandlerHook, HandlerWithMessageHook } from "./declare";

export class SocketHook<T extends any[] = []> {

    public static create<T extends any[] = []>(): SocketHook<T> {

        return new SocketHook<T>();
    }

    private _beforeHook: null | BeforeHook<T>;
    private _afterHook: null | AfterHook<T>;

    private _beforeWithMessageHook: null | BeforeWithMessageHook<T>;
    private _afterWithMessageHook: null | AfterWithMessageHook<T>;

    private constructor() {

        this._beforeHook = null;
        this._afterHook = null;

        this._beforeWithMessageHook = null;
        this._afterWithMessageHook = null;
    }

    public declareBefore(func: BeforeHook<T>): this {

        this._beforeHook = func;
        return this;
    }

    public declareAfter(func: AfterHook<T>): this {

        this._afterHook = func;
        return this;
    }

    public declareBeforeWithMessage(func: BeforeWithMessageHook<T>): this {

        this._beforeWithMessageHook = func;
        return this;
    }

    public declareAfterWithMessage(func: AfterWithMessageHook<T>): this {

        this._afterWithMessageHook = func;
        return this;
    }

    public wrap(handler: HandlerHook<T>, socket: SocketIO.Socket, ...args: T): () => any {

        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const _this: this = this;

        return async () => {

            if (_this._beforeHook) {

                const beforeHook = _this._beforeHook;
                const isBeforeSucceed: boolean = await beforeHook(socket, ...args);

                if (!isBeforeSucceed) {
                    return;
                }
            }

            await Promise.resolve(handler(socket, ...args));

            if (_this._afterHook) {

                const afterHook = _this._afterHook;
                await afterHook(socket, ...args);
            }
        };
    }

    public wrapWithMessage(handler: HandlerWithMessageHook<T>, socket: SocketIO.Socket, ...args: T): (message: string) => any {

        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const _this: this = this;

        return async (message: string) => {

            if (_this._beforeWithMessageHook) {

                const beforeHook = _this._beforeWithMessageHook;
                const isBeforeSucceed: boolean = await beforeHook(socket, message, ...args);

                if (!isBeforeSucceed) {
                    return;
                }
            }

            await Promise.resolve(handler(socket, message, ...args));

            if (_this._afterWithMessageHook) {

                const afterHook = _this._afterWithMessageHook;
                await afterHook(socket, message, ...args);
            }
        };
    }
}
