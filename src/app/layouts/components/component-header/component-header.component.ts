import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ThemeArray } from '@Doc/core/data';
import { DocumentationRouteEnum, ThemeEnum } from '@Doc/core/enums';
import { ThemeManagerService } from '@Doc/core/services';

@Component({
    selector: 'demo-component-header',
    templateUrl: './component-header.component.html',
    styleUrls: ['./component-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentHeaderComponent implements OnInit {

    public themes = ThemeArray;

    public routeEnum = DocumentationRouteEnum;

    constructor(
        private readonly themeManagerService: ThemeManagerService
    ) {}

    public ngOnInit(): void {}

    public onThemeChanged(event: Event): void {
        const target = event.target as HTMLSelectElement;
        const themeName = target.value as ThemeEnum;

        this.themeManagerService.applyTheme(themeName);
    }

}
