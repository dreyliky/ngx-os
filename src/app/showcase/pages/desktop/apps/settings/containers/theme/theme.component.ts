import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Theme, ThemeManagerService, THEMES } from '@Features/theme';
import { Subscription } from 'rxjs';

@Component({
    selector: 'settings-theme-section',
    templateUrl: './theme.component.html',
    styleUrls: ['./theme.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeComponent implements OnInit, OnDestroy {
    public appliedTheme: Theme;

    private appliedThemeSubscription: Subscription;

    constructor(
        private readonly themeService: ThemeManagerService,
        private readonly changeDetector: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.initAppliedThemeObserver();
    }

    public ngOnDestroy(): void {
        this.appliedThemeSubscription?.unsubscribe();
    }

    public onThemeChanged(theme: Theme): void {
        this.themeService.apply(theme.cssName);
    }

    private initAppliedThemeObserver(): void {
        this.appliedThemeSubscription = this.themeService.applied$
            .subscribe((themeCssName) => {
                this.appliedTheme = THEMES
                    .find((currTheme) => currTheme.cssName === themeCssName);

                this.changeDetector.detectChanges();
            });
    }
}
