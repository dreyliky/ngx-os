import { ChangeDetectionStrategy, Component, Inject, Optional } from '@angular/core';
import { DynamicWindowConfig, DynamicWindowService, IS_DYNAMIC_WINDOW_CONTEXT } from 'ngx-os/modules';

@Component({
    selector: 'showcase-window-dynamic-opening',
    templateUrl: './window-dynamic-opening.component.html',
    styleUrls: ['./window-dynamic-opening.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WindowDynamicOpeningComponent {
    public get windowData(): number {
        return this.config?.data;
    }

    constructor(
        @Inject(IS_DYNAMIC_WINDOW_CONTEXT) public readonly isComponentInsideWindow: boolean,
        @Inject(DynamicWindowConfig) @Optional() private readonly config: DynamicWindowConfig,
        private readonly dynamicWindowService: DynamicWindowService
    ) {}

    public onOpenWindowButtonClick(): void {
        this.dynamicWindowService.open(
            WindowDynamicOpeningComponent,
            {
                title: 'Overview window',
                width: 600,
                height: 300,
                data: Math.random()
            }
        );
    }
}
