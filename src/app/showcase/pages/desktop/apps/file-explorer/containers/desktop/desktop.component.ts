import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppMetadata, ExecService } from '../../../../features/exec';
import { APPS } from '../../../apps.array';

@Component({
    selector: 'file-explorer-desktop-section',
    templateUrl: './desktop.component.html',
    styleUrls: ['./desktop.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
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
