import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AccentColorManagerService, ThemeManagerService } from '@features/theme';

@Component({
    selector: 'demo-root',
    templateUrl: './demo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoComponent implements OnInit {
    constructor(
        private readonly themeManagerService: ThemeManagerService,
        private readonly accentColorManagerService: AccentColorManagerService
    ) {}

    public ngOnInit(): void {
        this.themeManagerService.init();
        this.accentColorManagerService.init();
    }
}
