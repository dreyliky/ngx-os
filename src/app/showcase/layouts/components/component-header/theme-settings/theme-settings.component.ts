import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AccentColorManagerService, Theme, ThemeManagerService, THEMES } from '@features/theme';
import { IThemeRgbColor } from 'ngx-os/modules';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'header-theme-settings',
    templateUrl: './theme-settings.component.html',
    styleUrls: ['./theme-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeSettingsComponent implements OnInit {
    public appliedTheme$: Observable<Theme>;
    public appliedColor$: Observable<IThemeRgbColor>;

    constructor(
        private readonly themeService: ThemeManagerService,
        private readonly accentColorService: AccentColorManagerService,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.appliedColor$ = this.accentColorService.applied$;

        this.initAppliedThemeObservable();
    }

    public onThemeChanged(theme: Theme): void {
        this.themeService.apply(theme.cssName);
    }

    public onAccentColorChanged(color: IThemeRgbColor): void {
        this.accentColorService.apply('primary', color);
    }

    private initAppliedThemeObservable(): void {
        this.appliedTheme$ = this.themeService.applied$
            .pipe(
                map((themeName) => THEMES.find((theme) => theme.cssName === themeName))
            );
    }
}
