import { assert } from 'chai';
import { File } from './file';

class Fake extends File<string> {
    async load(): Promise<string> {
        const byte = await this._read();
        return byte.toString('utf-8');
    }

    save(data: string): Promise<void> {
        const byte = Buffer.from(data, 'utf-8');
        return this._write(byte);
    }
}

describe('Testing "./tool/fsys/file"', () => {
    const test = new Fake('./test.txt');
    const copy = new Fake('./copy.txt');
    const move = new Fake('./move.txt');

    it('Check existence of file -> false', async () => {
        const res = await test.exist();
        assert.isFalse(res);
    });

    it('Create file', async () => {
        await test.save('JajajjAj dale men relax');
        const res = await test.exist();
        assert.isTrue(res);
    });

    it('Read the file', async () => {
        const text = await test.load();
        assert.strictEqual(text, 'JajajjAj dale men relax');
    });

    it('Copy the file -> "./copy.txt"', async () => {
        const obj = await test.copy('./copy.txt');
        assert.strictEqual(obj.path, copy.path);
    });

    it('Move "./copy.txt" -> "./move.txt"', async () => {
        const obj = await copy.move('./move.txt');
        assert.strictEqual(obj.path, move.path);
    });

    it('Delete all files', async () => {
        assert.isFalse(await copy.exist());
        assert.isTrue(await test.exist());
        assert.isTrue(await move.exist());
        
        await test.kill();
        await move.kill();
        assert.isFalse(await test.exist());
        assert.isFalse(await move.exist());
    });
});
