import { PackageJson } from '../package-json';
import { ORMConfig } from '../orm-config/orm-config';
import { TSConfig } from '../ts-config/ts-config';
import { resolve } from 'path';

export class Environment {
    private _packageJson: PackageJson;
    private _ormConfig: ORMConfig;
    private _tsConfig: TSConfig;

    constructor() {
        this._packageJson = new PackageJson();
        this._ormConfig = new ORMConfig();
        this._tsConfig = new TSConfig();
    }

    async checkProject(): Promise<void> {
        if (!await this._packageJson.exist()) {
            throw new Error('This isn\'t a node.js project (package.json not found).');
        }

        if (!await this._tsConfig.exist()) {
            throw new Error('This isn\'t a typescript project (tsconfig.json not found).');
        }

        const typeorm = await this._packageJson.hasDependency('typeorm');
        if (!typeorm) {
            throw new Error('TypeORM isn\'t installed, this dependency is required.');
        }

        if (!await this._ormConfig.exist()) {
            throw new Error('This isn\'t a typeorm project (ormconfig.json not found).');
        }
    }

    async requireTsPathMapping(): Promise<boolean> {
        const dependency = await this._packageJson.hasDependency('ts-path-mapping');
        if (!dependency) { return false; }

        const ts = await this._tsConfig.load();
        const paths = Object.keys(ts.compilerOptions?.paths ?? {});
        return dependency && paths.length > 0;
    }

    async requireTsNode(): Promise<boolean> {
        const dependency = await this._packageJson.hasDevDependency('ts-node');
        if (!dependency) { return false; }

        const orm = await this._ormConfig.load();
        const ts = await this._tsConfig.load();
        const root = resolve(ts.compilerOptions?.rootDir);
        
        let found = false;
        for (const conn of orm) {
            for (const path of conn.entities ?? []) {
                if (typeof path === 'string') {
                    if (path.startsWith(root)) {
                        found = true;
                        break;
                    }
                }
            }

            if (found) { break; }
            for (const path of conn.migrations ?? []) {
                if (typeof path === 'string') {
                    if (path.startsWith(root)) {
                        found = true;
                        break;
                    }
                }
            }
            
            if (found) { break; }
        }

        return found;
    }
}