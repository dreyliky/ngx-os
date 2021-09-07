import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
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
    @ViewChild('scrollView', { static: true, read: ElementRef })
    private readonly scrollViewElementRef: ElementRef<HTMLElement>;

    public scrollToTop(): void {
        this.scrollViewElementRef.nativeElement.scrollTo(0, 0);
    }
}
