import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ThemeEnum, ThemeService } from '@lib-modules';

@Component({
    selector: 'demo-theme-overview',
    templateUrl: './theme-overview.component.html',
    styleUrls: ['./theme-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeOverviewComponent implements OnInit {
    public readonly themes: ThemeEnum[] = [
        ThemeEnum.Win98,
        ThemeEnum.WinXP,
        ThemeEnum.Win10
    ];

    public appliedTheme: ThemeEnum;

    constructor(
        private readonly themeService: ThemeService,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.initAppliedThemeObserver();
    }

    public applyTheme(themeName: ThemeEnum): void {
        this.themeService.apply(themeName);
    }

    private initAppliedThemeObserver(): void {
        this.themeService.applied$
            .subscribe((appliedTheme) => {
                this.appliedTheme = appliedTheme;

                this.changeDetector.detectChanges();
            });
    }
}
