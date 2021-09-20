import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnInit } from '@angular/core';
import { OsBaseComponent } from '@lib-core';

@Component({
    selector: 'os-scroll-view',
    templateUrl: './scroll-view.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollViewComponent extends OsBaseComponent implements OnInit {
    @Input()
    public isVerticalScrollEnabled = true;

    @Input()
    public isHorizontalScrollEnabled = false;

    @HostBinding('style.overflow-x')
    public get hostOverflowX(): string {
        const overrideValue = this.style?.['overflow'] || this.style?.['overflowX'];

        if (!overrideValue) {
            return (this.isHorizontalScrollEnabled) ? 'auto' : 'hidden';
        }

        return overrideValue;
    }

    @HostBinding('style.overflow-y')
    public get hostOverflowY(): string {
        const overrideValue = this.style?.['overflow'] || this.style?.['overflowY'];

        if (!overrideValue) {
            return (this.isVerticalScrollEnabled) ? 'auto' : 'hidden';
        }

        return overrideValue;
    }

    constructor(
        private readonly hostElementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.classlistManager.add('os-scroll-view');
        this.initElementEventObservers(this.hostElementRef.nativeElement);
    }
}
