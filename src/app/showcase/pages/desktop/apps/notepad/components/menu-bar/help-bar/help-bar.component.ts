import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DynamicWindowService } from 'ngx-os';
import { AboutWindowComponent, ABOUT_WINDOW_CONFIG } from '../../about-window';

@Component({
    selector: 'notepad-menu-bar-help',
    templateUrl: './help-bar.component.html',
    styleUrls: ['./help-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelpBarComponent {
    constructor(
        private readonly windowService: DynamicWindowService
    ) {}

    public onAboutNotepadButtonClick(): void {
        this.windowService.open(AboutWindowComponent, ABOUT_WINDOW_CONFIG);
    }
}
