import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { MAIN_LAYOUT } from './main-layout.constants';

@Component({
    selector: 'demo-main-layout',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: MAIN_LAYOUT,
            useExisting: MainLayoutComponent
        }
    ]
})
export class MainLayoutComponent {
    @ViewChild('scrollView', { static: true, read: ElementRef })
    private readonly scrollViewElementRef: ElementRef<HTMLElement>;

    public scrollToTop(): void {
        this.scrollViewElementRef.nativeElement.scrollTo(0, 0);
    }
}
