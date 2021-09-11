import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppRouteEnum } from '@Core/enums';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'demo-component-header',
    templateUrl: './component-header.component.html',
    styleUrls: ['./component-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentHeaderComponent implements OnInit {
    public readonly libVersion: string = environment.version;

    public ngOnInit(): void {
        console.log(Math.random());
    }

    public get getStartedPagePath(): string {
        return `/${AppRouteEnum.GetStarted}`;
    }

    public get componentsPagePath(): string {
        return `/${AppRouteEnum.Components}`;
    }

    public get desktopPagePath(): string {
        return `/${AppRouteEnum.Desktop}`;
    }
}
