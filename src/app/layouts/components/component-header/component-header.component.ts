import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit
} from '@angular/core';
import { AppRouteEnum } from '@Doc/core/enums';
import { Theme, ThemeManagerService, THEMES } from '@Features/theme';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'demo-component-header',
    templateUrl: './component-header.component.html',
    styleUrls: ['./component-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentHeaderComponent implements OnInit, OnDestroy {
    public readonly libVersion: string = environment.version;

    public appliedTheme: Theme;

    public routeEnum = AppRouteEnum;

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
        this.themeService.applyTheme(theme.cssName);
    }

    private initAppliedThemeObserver(): void {
        this.appliedThemeSubscription = this.themeService.appliedTheme$
            .subscribe((themeCssName) => {
                this.appliedTheme = THEMES
                    .find((currTheme) => currTheme.cssName === themeCssName);

                this.changeDetector.detectChanges();
            });
    }
}
