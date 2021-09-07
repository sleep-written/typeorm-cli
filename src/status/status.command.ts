import { Command, CommandMethod } from '@bleed-believer/command';
import { Environment } from '../tool/environment/environment';

@Command({
    main: 'status',
    title: 'Project Status',
    description: 
                'Check the current project status '
            +   'according to the configuration files.'
})
export class StatusCommand {
    private _env = new Environment();

    @CommandMethod()
    async start(): Promise<void> {
        await this._env.checkProject();

        console.log('>> Checking Dependencies:');
        console.log('-------------------------------------------------------');
        console.log('ts-node required?         =', await this._env.requireTsNode());
        console.log('ts-path-mapping required? =', await this._env.requireTsPathMapping());
    }
}