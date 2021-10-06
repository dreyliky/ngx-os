import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnInit } from '@angular/core';
import { OsBaseComponent } from '../../../../core';

@Component({
    selector: 'os-title-bar-icon',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleBarIconComponent extends OsBaseComponent implements OnInit {
    /** The URL to the icon */
    @Input()
    public set url(value: string) {
        if (value) {
            this._iconCssBackground = `url(${value})`;
        }
    }

    @HostBinding('style.backgroundImage')
    public _iconCssBackground: string;

    constructor(
        private readonly hostRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.classListManager.add('os-title-bar-icon');
        this.initElementEventObservers(this.hostRef.nativeElement);
    }
}
