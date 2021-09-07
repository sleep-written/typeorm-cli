import { BleedModule } from '@bleed-believer/core';
import { CommandRouter } from '@bleed-believer/command';

import { RootCommand } from './root';
import { StatusCommand } from './status';

@BleedModule({
    imports: [
        CommandRouter.addToRouter({
            commands: [
                StatusCommand,
                RootCommand,
            ],
            before: () => {
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
            },
            error: err => {
                console.log('>> ERROR detected:');
                console.log('-------------------------------------------------------');
                console.log(err.message);
            }
        })
    ]
})
export class AppRoutingModule {}
