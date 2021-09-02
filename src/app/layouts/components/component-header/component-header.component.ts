import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppRouteEnum } from '@Core/enums';
import { OsComponentEnum } from '@Features/doc';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'demo-component-header',
    templateUrl: './component-header.component.html',
    styleUrls: ['./component-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentHeaderComponent {
    public readonly libVersion: string = environment.version;

    public get getStartedPagePath(): string {
        return `/${AppRouteEnum.GetStarted}`;
    }

    public get componentsPagePath(): string {
        return `/${AppRouteEnum.Components}`;
    }

    public get themePagePath(): string {
        return `/${AppRouteEnum.Components}/${OsComponentEnum.Theme}`;
    }

    public get desktopPagePath(): string {
        return `/${AppRouteEnum.Desktop}`;
    }
}
