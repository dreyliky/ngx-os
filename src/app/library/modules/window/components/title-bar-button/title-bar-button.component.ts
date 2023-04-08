import {
    ChangeDetectionStrategy,
    Component,
    HostListener,
    Input,
    ViewEncapsulation
} from '@angular/core';
import { ɵOsBaseViewComponent } from '../../../../core';

@Component({
    selector: 'button[os-title-bar-button]',
    templateUrl: './title-bar-button.component.html',
    host: {
        'class': 'os-title-bar-button'
    },
    exportAs: 'osTitleBarButton',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleBarButtonComponent extends ɵOsBaseViewComponent {
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

    /** @internal */
    @HostListener('click', ['$event'])
    public _onClick(event: MouseEvent): void {
        event.stopPropagation();
    }
}
