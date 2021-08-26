import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DemoDocProvider, LibDocProvider } from '@Features/doc';
import { ThemeManagerService } from '@Features/theme';

@Component({
    selector: 'demo-root',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        LibDocProvider,
        DemoDocProvider
    ]
})
export class DemoComponent {
    constructor(
        private readonly themeManagerService: ThemeManagerService
    ) {
        this.themeManagerService.applyThemeFromStorage();
    }
}
