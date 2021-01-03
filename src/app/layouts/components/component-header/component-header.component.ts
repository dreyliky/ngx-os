import {
    ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit
} from '@angular/core';
import { ThemeArray } from '@Doc/core/data';
import { DocumentationRouteEnum } from '@Doc/core/enums';
import { Theme } from '@Doc/core/interfaces';
import { ThemeManagerService } from '@Doc/core/services';
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

    public themes = ThemeArray;
    public appliedTheme: Theme;

    public routeEnum = DocumentationRouteEnum;

    private appliedThemeSubscription: Subscription;

    constructor(
        private readonly changeDetector: ChangeDetectorRef,
        private readonly themeManagerService: ThemeManagerService
    ) {}

    public ngOnInit(): void {
        this.initAppliedThemeObserver();
    }

    public ngOnDestroy(): void {
        this.appliedThemeSubscription?.unsubscribe();
    }

    public onThemeChanged(theme: Theme): void {
        this.themeManagerService.applyTheme(theme.cssName);
    }

    private initAppliedThemeObserver(): void {
        this.appliedThemeSubscription = this.themeManagerService.appliedTheme$
            .subscribe((themeCssName) => {
                this.appliedTheme = this.themes
                    .find((currTheme) => currTheme.cssName === themeCssName);

                this.changeDetector.detectChanges();
            });
    }

}
