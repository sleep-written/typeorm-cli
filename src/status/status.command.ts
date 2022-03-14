import { Command, Executable } from '@bleed-believer/commander';
import { Environment } from '../tool/environment/environment';

@Command({
    main: 'status',
    name: 'Project Status',
    info: 
                'Check the current project status '
            +   'according to the configuration files.'
})
export class StatusCommand implements Executable {
    private _env = new Environment();

    async start(): Promise<void> {
        await this._env.checkProject();

        console.log('>> Checking Dependencies:');
        console.log('-------------------------------------------------------');
        console.log('ts-node required?         =', await this._env.requireTsNode());
        console.log('ts-path-mapping required? =', await this._env.requireTsPathMapping());
    }
}