import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DynamicWindowService } from 'ngx-os';
import { FontWindowComponent, FONT_WINDOW_CONFIG } from '../../font-window';

@Component({
    selector: 'notepad-menu-bar-format',
    templateUrl: './format-bar.component.html',
    styleUrls: ['./format-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        DynamicWindowService
    ]
})
export class FormatBarComponent {
    constructor(
        private readonly windowService: DynamicWindowService
    ) {}

    public onFontButtonClick(): void {
        this.windowService.open(FontWindowComponent, FONT_WINDOW_CONFIG);
    }
}
