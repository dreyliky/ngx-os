import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ThemeArray } from '@Doc/core/data';
import { DocumentationRouteEnum, ThemeEnum } from '@Doc/core/enums';
import { ThemeManagerService } from '@Doc/core/services';
import { Subscription } from 'rxjs';

@Component({
    selector: 'demo-component-header',
    templateUrl: './component-header.component.html',
    styleUrls: ['./component-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentHeaderComponent implements OnInit {

    public themes = ThemeArray;
    public appliedTheme: ThemeEnum;

    public routeEnum = DocumentationRouteEnum;

    private appliedThemeSubscription: Subscription;

    constructor(
        private readonly changeDetector: ChangeDetectorRef,
        private readonly themeManagerService: ThemeManagerService
    ) {}

    public ngOnInit(): void {
        this.initAppliedThemeObserver();
    }

    public onThemeChanged(event: Event): void {
        const target = event.target as HTMLSelectElement;
        const themeName = target.value as ThemeEnum;

        this.themeManagerService.applyTheme(themeName);
    }

    private initAppliedThemeObserver(): void {
        this.appliedThemeSubscription = this.themeManagerService.appliedTheme$
            .subscribe((theme) => {
                this.appliedTheme = theme;

                this.changeDetector.detectChanges();
            });
    }

}
