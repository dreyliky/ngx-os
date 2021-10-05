import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppRouteEnum } from '@core/enums';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'showcase-component-header',
    templateUrl: './component-header.component.html',
    styleUrls: ['./component-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentHeaderComponent {
    public readonly libVersion: string = environment.version;

    public readonly recommendedBrowserText: string = 'The library is on the alpha stage right now. '
        + 'Recommend using the latest version of Google Chrome to get the best experience.';

    public get getStartedPagePath(): string {
        return 'https://github.com/dreyliky/ngx-os/blob/master/src/app/library/docs/get-started.md';
    }

    public get componentsPagePath(): string {
        return `/${AppRouteEnum.Components}`;
    }

    public get desktopPagePath(): string {
        return `/${AppRouteEnum.Desktop}`;
    }

    public onChromeIconClick(): void {
        alert(this.recommendedBrowserText);
    }
}
