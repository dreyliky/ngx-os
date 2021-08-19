import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DynamicWindowService } from 'os-angular';

@Component({
    selector: 'demo-window-overview',
    templateUrl: './window-overview.component.html',
    styleUrls: ['./window-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WindowOverviewComponent {
    constructor(
        private readonly dynamicWindowService: DynamicWindowService
    ) {}

    public onOpenWindowButtonClick(): void {
        this.dynamicWindowService.open(
            WindowOverviewComponent,
            {
                title: 'Overview window',
                width: 600,
                height: 300
            }
        );
    }
}
