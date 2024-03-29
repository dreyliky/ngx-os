import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Input,
    ViewEncapsulation
} from '@angular/core';
import { ɵOsBaseViewComponent } from '../../../../core';

@Component({
    selector: 'os-scroll-view',
    template: '<ng-content></ng-content>',
    host: {
        'class': 'os-scroll-view'
    },
    exportAs: 'osScrollView',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollViewComponent extends ɵOsBaseViewComponent {
    /** Is vertical scroll enabled? */
    @Input()
    public isVerticalScrollEnabled: boolean = true;

    /** Is horizontal scroll enabled? */
    @Input()
    public isHorizontalScrollEnabled: boolean = false;

    /** Does the vertical scroll hide when it is not needed? */
    @Input()
    public isVerticalScrollHiding: boolean = true;

    /** Does the horizontal scroll hide when it is not needed? */
    @Input()
    public isHorizontalScrollHiding: boolean = true;

    /** @internal */
    @HostBinding('style.overflow-x')
    public get _hostOverflowX(): string {
        if (this.isHorizontalScrollHiding) {
            return (this.isHorizontalScrollEnabled) ? 'auto' : 'hidden';
        }

        return (this.isHorizontalScrollEnabled) ? 'scroll' : 'hidden';
    }

    /** @internal */
    @HostBinding('style.overflow-y')
    public get _hostOverflowY(): string {
        if (this.isVerticalScrollHiding) {
            return (this.isVerticalScrollEnabled) ? 'auto' : 'hidden';
        }

        return (this.isVerticalScrollEnabled) ? 'scroll' : 'hidden';
    }

    constructor(
        private readonly hostRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    /** Scrolls to given coordinates. Recommend to use this method instead of directly via HTML element */
    public scrollTo(left: number, top: number): void {
        this.hostRef.nativeElement.scrollTo({ left, top });
    }
}
