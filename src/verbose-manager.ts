/**
 * @author WMXPY
 * @namespace Socket
 * @description Verbose Manager
 */

import { VerboseFunction } from "./declare";

export class SocketVerboseManager {

    private static _instance?: SocketVerboseManager;

    public static getInstance(): SocketVerboseManager {

        if (!this._instance) {

            this._instance = new SocketVerboseManager();
        }
        return this._instance;
    }

    public static verbose(...args: any[]): void {

        const instance: SocketVerboseManager = SocketVerboseManager.getInstance();
        instance.verbose(...args);

        return;
    }

    private readonly _verbose: Set<VerboseFunction>;

    private constructor() {

        this._verbose = new Set();
    }

    public verbose(...args: any[]): this {

        for (const verboseFunction of this._verbose) {
            verboseFunction(...args);
        }
        return this;
    }

    public add(verboseFunction: VerboseFunction): this {

        this._verbose.add(verboseFunction);
        return this;
    }

    public remove(verboseFunction: VerboseFunction): this {
        this._verbose.delete(verboseFunction);
        return this;
    }
}
