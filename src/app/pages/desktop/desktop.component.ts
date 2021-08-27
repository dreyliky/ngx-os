import { ChangeDetectionStrategy, Component } from '@angular/core';
import { APPS } from './apps';
import { AppMetadata, ExecService } from './features/exec';

@Component({
    selector: 'demo-desktop-page',
    templateUrl: './desktop.component.html',
    styleUrls: ['./desktop.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        ExecService
    ]
})
export class DesktopComponent {
    public programs = APPS;

    constructor(
        private readonly execService: ExecService
    ) {}

    public onProgramShortcutDblClick(program: AppMetadata): void {
        this.execService.run(program);
    }
}
