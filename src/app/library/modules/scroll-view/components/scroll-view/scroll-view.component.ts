import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { OsBaseComponent } from '../../../../core';

@Component({
    selector: 'os-scroll-view',
    templateUrl: './scroll-view.component.html',
    host: {
        'class': 'os-scroll-view'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollViewComponent extends OsBaseComponent implements OnInit {
    /** Is vertical scroll enabled? */
    @Input()
    public isVerticalScrollEnabled: boolean = true;

    /** Is horizontal scroll enabled? */
    @Input()
    public isHorizontalScrollEnabled: boolean = false;

    /** Does the vertical scroll hide when it is not needed? */
    @Input()
    public isVerticalScrollHiding: boolean = false;

    /** Does the horizontal scroll hide when it is not needed? */
    @Input()
    public isHorizontalScrollHiding: boolean = false;

    /** @internal */
    @HostBinding('style.overflow-x')
    public get _hostOverflowX(): string {
        if (!this.isHorizontalScrollHiding) {
            return (this.isHorizontalScrollEnabled) ? 'auto' : 'hidden';
        }

        return (this.isHorizontalScrollEnabled) ? 'scroll' : 'hidden';
    }

    /** @internal */
    @HostBinding('style.overflow-y')
    public get _hostOverflowY(): string {
        if (!this.isVerticalScrollHiding) {
            return (this.isVerticalScrollEnabled) ? 'auto' : 'hidden';
        }

        return (this.isVerticalScrollEnabled) ? 'scroll' : 'hidden';
    }

    constructor(
        private readonly hostRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.initElementEventObservers(this.hostRef.nativeElement);
    }

    /** Scrolls to given coordinates. Recommend to use this method instead of directly via HTML element */
    public scrollTo(left: number, top: number): void {
        this.hostRef.nativeElement.scrollTo({ left, top });
    }
}
