import { resolve } from 'path';
import * as fsPromises from 'fs/promises';

export abstract class FsysBase {
    protected _path: string;
    public get path(): string {
        return this._path;
    }

    constructor(path: string, ...pathParts: string[]) {
        this._path = resolve(path, ...pathParts);
    }

    async exist(): Promise<boolean> {
        try {
            await fsPromises.access(this._path);
            return true;
        } catch {
            return false;
        }
    }

    async move(path: string, ...pathParts: string[]): Promise<this> {
        const copy = await this.copy(path, ...pathParts);
        await this.kill();
        return copy;
    };

    abstract copy(path: string, ...pathParts: string[]): Promise<this>;
    abstract kill(): Promise<void>;
}