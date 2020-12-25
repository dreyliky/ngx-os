import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ThemeArray } from '@Doc/core/data';
import { DocumentationRouteEnum } from '@Doc/core/enums';
import { ThemeService } from 'os-angular';

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
        private readonly themeService: ThemeService
    ) {}

    public ngOnInit(): void {}

    public onThemeChanged(event: Event): void {
        const target = event.target as HTMLSelectElement;
        console.log(event);
        this.themeService.applyTheme(target.value);
    }

}
