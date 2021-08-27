import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { APPS } from './apps';
import { NOTEPAD_APP } from './apps/notepad';
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
export class DesktopComponent implements OnInit {
    public programs = APPS;

    constructor(
        private readonly execService: ExecService
    ) {}

    public ngOnInit(): void {
        this.onProgramShortcutDblClick(NOTEPAD_APP);
    }

    public onProgramShortcutDblClick(program: AppMetadata): void {
        this.execService.run(program);
    }
}
