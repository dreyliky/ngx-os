import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
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

    /** Stylelist for the icon */
    @Input()
    public readonly iconStyle: object;

    /** Classlist for the icon */
    @Input()
    public readonly iconStyleClass: string | string[] | object;

    /** @internal */
    public get _iconCssUrl(): string {
        return (this.iconUrl) ? `url(${this.iconUrl})` : null;
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
