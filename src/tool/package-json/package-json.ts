import { File } from '../fsys';
import { PackageData } from './package-data';

export class PackageJson extends File<PackageData> {
    constructor(path?: string) {
        super(path ?? './package.json');
    }

    async load(): Promise<PackageData> {
        const byte = await this._read();
        const text = byte.toString('utf-8');
        return JSON.parse(text);
    }

    save(data: PackageData): Promise<void> {
        const text = JSON.stringify(data, null, '  ');
        const byte = Buffer.from(text, 'utf-8');
        return this._write(byte);
    }

    async hasDependency(name: string): Promise<boolean> {
        const data = await this.load();
        const keys = Object.keys(data.dependencies);
        return keys.some(x => x === name);
    }

    async hasDevDependency(name: string): Promise<boolean> {
        const data = await this.load();
        const keys = Object.keys(data.devDependencies);
        return keys.some(x => x === name);
    }
}
