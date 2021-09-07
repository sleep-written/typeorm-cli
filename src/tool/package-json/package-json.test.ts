import { assert } from 'chai';
import { PackageJson } from './package-json';

describe('Testing "./tool/package-json"', () => {
    const obj = new PackageJson();
    it('Check the existence of "./package.json"', async () => {
        const res = await obj.exist();
        assert.isTrue(res);
    });

    it('Read "this.devDependencies"', async () => {
        const data = await obj.load();
        assert.containsAllKeys(data, [ 'devDependencies' ]);

        const keys = Object.keys(data.devDependencies);
        assert.sameMembers(keys, [
            '@types/chai',
            '@types/mocha',
            '@types/node',
            'chai',
            'mocha',
            'ts-node',
            'typescript',
        ]);
    });

    it('Read "this.dependencies"', async () => {
        const data = await obj.load();
        assert.containsAllKeys(data, [ 'dependencies' ]);

        const keys = Object.keys(data.dependencies);
        assert.sameMembers(keys, [
            '@bleed-believer/command',
            '@bleed-believer/core',
            'typeorm',
            'json5'
        ]);
    });

    it('Has "mocha" installed? [in devDependencies] -> true', async () => {
        const res = await obj.hasDevDependency('mocha');
        assert.isTrue(res);
    });

    it('Has "@types/express" installed? [in devDependencies] -> false', async () => {
        const res = await obj.hasDevDependency('@types/express');
        assert.isFalse(res);
    });

    it('Has "@bleed-believer/core" installed? [in dependencies] -> true', async () => {
        const res = await obj.hasDependency('@bleed-believer/core');
        assert.isTrue(res);
    });

    it('Has "express" installed? [in dependencies] -> false', async () => {
        const res = await obj.hasDependency('express');
        assert.isFalse(res);
    });
});
