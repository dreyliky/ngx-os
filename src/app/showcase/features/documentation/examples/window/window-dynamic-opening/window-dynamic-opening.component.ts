import { ChangeDetectionStrategy, Component, Inject, Optional } from '@angular/core';
import {
    DynamicWindowRefModel,
    DynamicWindowService,
    DYNAMIC_WINDOW_REF,
    IS_DYNAMIC_WINDOW_CONTEXT
} from 'ngx-os';

@Component({
    selector: 'showcase-window-dynamic-opening',
    templateUrl: './window-dynamic-opening.component.html',
    styleUrls: ['./window-dynamic-opening.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WindowDynamicOpeningComponent {
    public get windowData(): number {
        return this.windowRef?.config?.data;
    }

    constructor(
        @Inject(IS_DYNAMIC_WINDOW_CONTEXT) public readonly isComponentInsideWindow: boolean,
        @Inject(DYNAMIC_WINDOW_REF) @Optional() private readonly windowRef: DynamicWindowRefModel,
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
