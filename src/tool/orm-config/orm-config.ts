import { resolve } from 'path';
import { File } from '../fsys';

import { ORMConfigData } from './orm-config-data';

export class ORMConfig extends File<ORMConfigData[]> {
    constructor(path?: string) {
        super(path ?? './ormconfig.json');
    }

    async load(): Promise<ORMConfigData[]> {
        // Reads directly the JSON file
        const byte = await this._read();
        const text = byte.toString('utf-8');
        const data = JSON.parse(text);

        const out: ORMConfigData[] = [];
        if (data instanceof Array) {
            out.push(...data);
        } else {
            out.push(data);
        }

        // Parse paths
        for (const item of out) {
            item.migrations?.forEach((path, i) => {
                if (typeof path === 'string') {
                    item.migrations[i] = resolve(path);
                }
            });

            item.entities?.forEach((path, i) => {
                if (typeof path === 'string') {
                    item.entities[i] = resolve(path);
                }
            });
        }

        return out;
    }

    save(data: ORMConfigData): Promise<void>;
    save(data: ORMConfigData[]): Promise<void>;
    save(data: ORMConfigData | ORMConfigData[]): Promise<void> {
        let base: any;
        if (data instanceof Array) {
            base = data.map(x => ({ ...x }));
        } else {
            base = { ...data };
        }

        const text = JSON.stringify(base, null, '  ');
        const byte = Buffer.from(text, 'utf-8');
        return this._write(byte);
    }
}