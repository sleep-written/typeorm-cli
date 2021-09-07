import { parse } from 'json5';
import { File } from '../fsys';

import { TSConfigData } from './ts-config-data';

export class TSConfig extends File<TSConfigData> {
    constructor(path?: string) {
        super(path ?? './tsconfig.json');
    }

    async load(): Promise<TSConfigData> {
        const byte = await this._read();
        const text = byte.toString('utf-8');
        return parse(text);
    }

    save(data: TSConfigData): Promise<void> {
        const text = JSON.stringify(data);
        const byte = Buffer.from(text, 'utf-8');
        return this._write(byte);
    }
}
