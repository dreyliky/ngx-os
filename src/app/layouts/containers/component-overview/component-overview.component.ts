import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import { COMPONENT_OVERVIEW_LAYOUT } from './component-overview.constants';

@Component({
    selector: 'demo-component-overview-layout',
    templateUrl: './component-overview.component.html',
    styleUrls: ['./component-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: COMPONENT_OVERVIEW_LAYOUT,
            useExisting: ComponentOverviewLayoutComponent
        }
    ]
})
export class ComponentOverviewLayoutComponent {
    public get hostElement(): HTMLElement {
        return this.hostElementRef.nativeElement;
    }

    constructor(
        private readonly hostElementRef: ElementRef<HTMLElement>
    ) {}
}
