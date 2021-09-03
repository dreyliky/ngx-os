import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnInit } from '@angular/core';
import { OsBaseComponent } from '@lib-core';

@Component({
    selector: 'os-scroll-view',
    templateUrl: './scroll-view.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollViewComponent extends OsBaseComponent implements OnInit {
    @Input()
    public verticalScrollEnabled = true;

    @Input()
    public horizontalScrollEnabled = false;

    @HostBinding('style.overflow-x')
    public get hostOverflowX(): string {
        return (this.horizontalScrollEnabled) ? 'auto' : 'hidden';
    }

    @HostBinding('style.overflow-y')
    public get hostOverflowY(): string {
        return (this.verticalScrollEnabled) ? 'auto' : 'hidden';
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
