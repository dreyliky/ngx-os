import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Theme, ThemeManagerService, THEMES } from '@features/theme';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'settings-theme-section',
    templateUrl: './theme.component.html',
    styleUrls: ['./theme.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeComponent implements OnInit {
    public appliedTheme$: Observable<Theme>;

    constructor(
        private readonly themeService: ThemeManagerService,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.initAppliedThemeObservable();
    }

    public onThemeChanged(theme: Theme): void {
        this.themeService.apply(theme.cssName);
    }

    private initAppliedThemeObservable(): void {
        this.appliedTheme$ = this.themeService.applied$
            .pipe(
                map((themeName) => THEMES.find((theme) => theme.cssName === themeName))
            );
    }
}
