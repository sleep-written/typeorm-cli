import { Argv, Command, Executable } from '@bleed-believer/commander';
import { Environment } from '../tool/environment/environment';

import { spawn } from 'child_process';
import * as cmd from '../tool/cmd';
import { resolve } from 'path';

@Command({
    main: '...args',
    name: 'Root command'
})
export class RootCommand implements Executable {
    private _env = new Environment();

    async start(args: Argv): Promise<void> {
        // Goto check method
        if (args.main[0]?.match(/status/gi)) {
            return;
        }
        
        // Build the base command
        await this._env.checkProject();
        const argv: string[] = [
            './node_modules/typeorm/cli.js',
            ...process.argv.slice(2)
        ];

        // Check if the project needs to use ts-path-mapping
        const tsPath = await this._env.requireTsPathMapping();
        if (tsPath) {
            argv.unshift('ts-path-mapping/register');
            argv.unshift('--require');
        }

        // Check if the project needs to use ts-node
        const tsNode = await this._env.requireTsNode();
        if (tsNode) {
            // Add ts-node
            argv.unshift('ts-node/register');
            argv.unshift('--require');
        } else {
            // Recompile
            await this._env.clearDist();
            let path = resolve(`./node_modules/.bin/tsc`);
            if (process.platform === 'win32') {
                path += '.cmd';
            }
            
            const resp = await cmd.spawn(path);
            if (resp.stderr) {
                throw new Error(resp.stderr.toString());
            }
        }

        console.log('>> Executing official TypeORM cli:');
        console.log('-------------------------------------------------------');
        return new Promise<void>((resolve, reject) => {
            const cmd = spawn(process.argv[0], argv, {
                serialization: 'advanced'
            });

            const stdoutPipe = cmd.stdout.pipe(process.stdout);
            const stderrPipe = cmd.stderr.pipe(process.stderr);

            cmd.on('close', () => {
                stdoutPipe.end();
                stderrPipe.end();
                resolve();
            });
            
            cmd.on('error', (err) => {
                stdoutPipe.end();
                stderrPipe.end();
                reject(err);
            });
        });
    }
}
