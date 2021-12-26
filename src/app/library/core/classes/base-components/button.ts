import { Component, HostBinding, Injector, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ɵCommonCssClassEnum } from '../../enums';
import { ɵOsBaseComponent } from './component';

@Component({
    template: ''
})
export abstract class ɵOsBaseButtonComponent extends ɵOsBaseComponent {
    /** Is button disabled */
    @Input()
    @HostBinding(`class.${ɵCommonCssClassEnum.Disabled}`)
    public isDisabled: boolean;

    /** Is button focused */
    @Input()
    @HostBinding(`class.${ɵCommonCssClassEnum.Focused}`)
    public isFocused: boolean;

    /** Metadata of destination of the button */
    @Input()
    @HostBinding('attr.aria-label')
    public ariaLabel: string;

    /** Metadata of relation of the button */
    @Input()
    @HostBinding('attr.aria-controls')
    public ariaControls: string;

    /** Metadata of selection state of the button */
    @Input()
    @HostBinding('attr.aria-selected')
    public ariaSelected: string;

    /** Metadata of role of the button */
    @Input()
    @HostBinding('attr.role')
    public role: string;

    /** Target internal element focus event */
    @Output()
    public osFocus: Observable<FocusEvent> = this.createEvent<WheelEvent>('focus');

    /** Target internal element blur event */
    @Output()
    public osBlur: Observable<FocusEvent> = this.createEvent<WheelEvent>('blur');

    /** @internal */
    @HostBinding('attr.tabindex')
    public get _hostTabIndexAttr(): number | null {
        return (this.isDisabled) ? null : 0;
    }

    constructor(
        injector: Injector
    ) {
        super(injector);
    }
}
