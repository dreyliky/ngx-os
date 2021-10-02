import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AccentColorManagerService, ThemeManagerService } from '@features/theme';

@Component({
    selector: 'showcase-root',
    templateUrl: './showcase.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowcaseComponent implements OnInit {
    constructor(
        private readonly themeManagerService: ThemeManagerService,
        private readonly accentColorManagerService: AccentColorManagerService
    ) {}

    public ngOnInit(): void {
        this.themeManagerService.init();
        this.accentColorManagerService.init();
    }
}
