import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { OsBaseComponent } from '@core';

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

    public ngOnInit(): void {
        this.hostClasslistManager.add('os-scroll-view');
    }
}
