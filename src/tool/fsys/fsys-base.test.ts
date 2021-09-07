import { FsysBase } from './fsys-base';
import { join } from 'path';
import { assert } from 'chai';

class Fake extends FsysBase {
    copy(): Promise<this> {
        throw new Error('Method not implemented.');
    }

    kill(): Promise<void> {
        throw new Error('Method not implemented.');
    }
}

describe('Testing "./tool/fsys/fsys-base"', () => {
    const cwd = process.cwd();

    it('Resolve path: "."', () => {
        const obj = new Fake('.');
        assert.strictEqual(obj.path, cwd);
    });

    it('Resolve path: "./package.json"', () => {
        let obj = new Fake('./package.json');
        const path = join(cwd, 'package.json');
        
        assert.strictEqual(obj.path, path);
        obj = new Fake('.', 'package.json');
        assert.strictEqual(obj.path, path);
    });

    it('Resolve path: "./node_modules/typescript"', () => {
        let obj = new Fake('./node_modules/typescript');
        const path = join(cwd, 'node_modules/typescript');

        assert.strictEqual(obj.path, path);
        obj = new Fake('.', 'node_modules', 'typescript');
        assert.strictEqual(obj.path, path);
    });

    it('Check existence of "./node_modules" = true', async () => {
        const obj = new Fake('./node_modules');
        const res = await obj.exist();
        assert.isTrue(res);
    });

    it('Check existence of "./package.json" = true', async () => {
        const obj = new Fake('./node_modules');
        const res = await obj.exist();
        assert.isTrue(res);
    });

    it('Check existence of "./unknown.sus" = false', async () => {
        const obj = new Fake('./unknown.sus');
        const res = await obj.exist();
        assert.isFalse(res);
    });
});
