import { assert } from 'chai';
import { ORMConfig } from './orm-config';

describe('Testing "./tool/ormconfig-json"', () => {
    const obj = new ORMConfig('./ormconfig.json');
    afterEach(async () => {
        await obj.kill();
    });
    
    it('Create "ormconfig.json" Object', async () => {
        await obj.save({
            type: 'mssql',
            host: 'localhost',
            database: 'TEST_DB',
            migrations: [ './src/migrations/**/*.ts' ],
            entities:   [ './src/entities/**/*.test.ts' ],
        });

        const data = await obj.load();
        assert.isArray(data);
        assert.lengthOf(data, 1);
        for (const item of data) {
            assert.isObject(item);
            assert.containsAllKeys(item, [
                'type', 'host', 'database',
                'migrations', 'entities'
            ]);
        }
    });
    
    it('Create "ormconfig.json" Array', async () => {
        await obj.save([
            {
                type: 'mssql',
                host: 'localhost',
                database: 'TEST_DB',
                migrations: [ './src/migrations/**/*.ts' ],
                entities:   [ './src/entities/**/*.test.ts' ],
                cli: {
                    migrationsDir: './src/migrations',
                    entitiesDir:   './src/entities',
                }
            }, {
                name: 'jaja',
                type: 'mssql',
                host: 'localhost',
                database: 'TEST_DB_BAK',
                migrations: [ './src/migrations-bak/**/*.ts' ],
                entities:   [ './src/entities-bak/**/*.test.ts' ],
            }
        ]);

        const data = await obj.load();
        assert.isArray(data);
        assert.lengthOf(data, 2);
        for (const item of data) {
            assert.isObject(item);
            assert.containsAllKeys(item, [
                'type', 'host', 'database',
                'migrations', 'entities'
            ]);
        }

        console.log(data);
    });
});