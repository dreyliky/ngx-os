import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { OsBaseButtonComponent } from '../../../../core';

@Component({
    selector: 'os-title-bar-button',
    templateUrl: './title-bar-button.component.html',
    host: {
        'class': 'os-title-bar-button'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleBarButtonComponent extends OsBaseButtonComponent implements OnInit {
    /** Link to the icon */
    @Input()
    public readonly iconUrl: string;

    /** Styles for the icon */
    @Input()
    public readonly iconStyle: object;

    public get _iconStyle(): object {
        return (!this.iconUrl) ? null : {
            backgroundImage: `url(${this.iconUrl})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '0px 0px',
            ...this.iconStyle
        };
    }

    constructor(
        private readonly hostRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.initElementEventObservers(this.hostRef.nativeElement);
    }
}
