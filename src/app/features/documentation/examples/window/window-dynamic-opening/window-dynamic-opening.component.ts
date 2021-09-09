import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DynamicWindowService } from '@lib-modules';

@Component({
    selector: 'demo-window-dynamic-opening',
    templateUrl: './window-dynamic-opening.component.html',
    styleUrls: ['./window-dynamic-opening.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WindowDynamicOpeningComponent {
    constructor(
        private readonly dynamicWindowService: DynamicWindowService
    ) {}

    public onOpenWindowButtonClick(): void {
        this.dynamicWindowService.open(
            WindowDynamicOpeningComponent,
            {
                title: 'Overview window',
                width: 600,
                height: 300
            }
        );
    }
}
