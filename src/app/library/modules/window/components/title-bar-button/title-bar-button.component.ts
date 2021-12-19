import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { ɵOsBaseButtonComponent } from '../../../../core';

@Component({
    selector: 'os-title-bar-button',
    templateUrl: './title-bar-button.component.html',
    host: {
        'class': 'os-title-bar-button'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleBarButtonComponent extends ɵOsBaseButtonComponent implements OnInit {
    /** Link to the icon */
    @Input()
    public iconUrl: string;

    /** Stylelist for the icon */
    @Input()
    public iconStyle: object;

    /** Classlist for the icon */
    @Input()
    public iconStyleClass: string | string[] | object;

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

    public onClick(event: MouseEvent): void {
        super.onClick(event);
        event.stopPropagation();
    }
}
