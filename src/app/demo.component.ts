import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AccentColorManagerService, ThemeManagerService } from '@Features/theme';

@Component({
    selector: 'demo-root',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoComponent {
    constructor(
        private readonly themeManagerService: ThemeManagerService,
        private readonly accentColorManagerService: AccentColorManagerService
    ) {
        this.themeManagerService.applyFromStorage();
        this.accentColorManagerService.applyFromStorage();
    }
}
