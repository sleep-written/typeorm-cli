import { assert } from 'chai';
import { TSConfig } from './ts-config';

describe('Testing "./tool/ts-config"', () => {
    it('Read "./tsconfig.json" file', async () => {
        const file = new TSConfig();
        const data = await file.load();

        assert.containsAllKeys(data, [ 'compilerOptions' ]);
        assert.containsAllKeys(data.compilerOptions, [
            'module', 'rootDir', 'outDir'
        ]);
    });
});