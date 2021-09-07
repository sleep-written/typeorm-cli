import { Args, Command, CommandMethod } from '@bleed-believer/command';
import { Environment } from '../tool/environment/environment';
import { spawn } from 'child_process';

@Command({
    main: '...args',
    title: 'Root command'
})
export class RootCommand {
    private _env = new Environment();

    @CommandMethod()
    async start(args: Args): Promise<void> {
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
            argv.unshift('ts-node/register');
            argv.unshift('--require');
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
