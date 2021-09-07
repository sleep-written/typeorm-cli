import * as fsPromises from 'fs/promises';
import { OpenMode } from 'fs';

import { FsysBase } from './fsys-base';

export abstract class File<T> extends FsysBase {
    protected _read(flag?: OpenMode): Promise<Buffer> {
        return fsPromises.readFile(this._path, { flag });
    }

    protected _write(byte?: Buffer): Promise<void> {
        return fsPromises.writeFile(this._path, byte);
    }

    /**
     * Deletes the current file.
     * @param force When `true`, exceptions will be ignored if `path` does not exist.
     */
    kill(force?: boolean): Promise<void> {
        return fsPromises.rm(this._path, { force: force ?? false });
    }

    async copy(path: string, ...pathParts: string[]): Promise<this> {
        const proto = Object.getPrototypeOf(this).constructor;
        const other = new proto(path, ...pathParts) as this;

        await fsPromises.copyFile(this._path, other.path);
        return other;
    }

    abstract load(): Promise<T>;
    abstract save(data: T): Promise<void>;
}
