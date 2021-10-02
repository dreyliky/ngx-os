import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AccentColorManagerService, Theme, ThemeManagerService, THEMES } from '@features/theme';
import { IThemeRgbColor } from 'ngx-os/modules';
import { Subscription } from 'rxjs';

@Component({
    selector: 'header-theme-settings',
    templateUrl: './theme-settings.component.html',
    styleUrls: ['./theme-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeSettingsComponent implements OnInit, OnDestroy {
    public appliedTheme: Theme;
    public appliedColor: IThemeRgbColor;

    private appliedThemeSubscription: Subscription;
    private appliedColorSubscription: Subscription;

    constructor(
        private readonly themeService: ThemeManagerService,
        private readonly accentColorService: AccentColorManagerService,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.initAppliedThemeObserver();
        this.initAppliedColorObserver();
    }

    public ngOnDestroy(): void {
        this.appliedThemeSubscription.unsubscribe();
        this.appliedColorSubscription.unsubscribe();
    }

    public onThemeChanged(theme: Theme): void {
        this.themeService.apply(theme.cssName);
    }

    public onAccentColorChanged(color: IThemeRgbColor): void {
        this.accentColorService.apply('primary', color);
    }

    private initAppliedThemeObserver(): void {
        this.appliedThemeSubscription = this.themeService.applied$
            .subscribe((themeCssName) => {
                this.appliedTheme = THEMES
                    .find((currTheme) => currTheme.cssName === themeCssName);

                this.changeDetector.detectChanges();
            });
    }

    private initAppliedColorObserver(): void {
        this.appliedColorSubscription = this.accentColorService.applied$
            .subscribe((color) => {
                this.appliedColor = color;

                this.changeDetector.detectChanges();
            });
    }
}
