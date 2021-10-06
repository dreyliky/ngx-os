import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnInit } from '@angular/core';
import { OsBaseComponent } from '../../../../core';

@Component({
    selector: 'os-scroll-view',
    templateUrl: './scroll-view.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollViewComponent extends OsBaseComponent implements OnInit {
    @Input()
    public isVerticalScrollEnabled: boolean = true;

    @Input()
    public isHorizontalScrollEnabled: boolean = false;

    @Input()
    public isVerticalScrollHiding: boolean = false;

    @Input()
    public isHorizontalScrollHiding: boolean = false;

    @HostBinding('style.overflow-x')
    public get _hostOverflowX(): string {
        if (!this.isHorizontalScrollHiding) {
            return (this.isHorizontalScrollEnabled) ? 'auto' : 'hidden';
        }

        return (this.isHorizontalScrollEnabled) ? 'scroll' : 'hidden';
    }

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
        this.classListManager.add('os-scroll-view');
        this.initElementEventObservers(this.hostRef.nativeElement);
    }

    public scrollTo(left: number, top: number): void {
        this.hostRef.nativeElement.scrollTo({ left, top });
    }
}
