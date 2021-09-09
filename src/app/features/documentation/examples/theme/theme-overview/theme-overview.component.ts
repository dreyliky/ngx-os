import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThemeEnum, ThemeService } from '@lib-modules';

@Component({
    selector: 'demo-theme-overview',
    templateUrl: './theme-overview.component.html',
    styleUrls: ['./theme-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeOverviewComponent {
    public readonly themeEnum = ThemeEnum;

    constructor(
        private readonly themeService: ThemeService
    ) {}

    public applyTheme(themeName: ThemeEnum): void {
        this.themeService.applyTheme(themeName);
    }
}
