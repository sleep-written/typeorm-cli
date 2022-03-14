import { CommandRouting, BeforeCommand, FailedCommand } from '@bleed-believer/commander';

import { RootCommand } from './root';
import { StatusCommand } from './status';

@CommandRouting({
    commands: [
        StatusCommand,
        RootCommand,
    ]
})
export class AppRoutingModule implements BeforeCommand, FailedCommand {
    before(): void {
        console.clear();
        console.log('           //---------====###====---------\\\\');
        console.log('      -=<<{{ TypeORM unnoficial cli v0.0.3 }}>>=-');
        console.log('           \\\\---------====###====---------//\n');
        console.log(
                '-------------------------------------------------------\n'
            +   'An unnoficial typeorm cli handler adding the required \n'
            +   'dependencies for a more simple usage...\n'
            +   '-------------------------------------------------------\n'
        );
    }

    failed(e: Error): void {
        console.log('>> ERROR detected:');
        console.log('-------------------------------------------------------');
        console.log(e.message);
    }

}
