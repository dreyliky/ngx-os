import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { CommonCssClassEnum } from '../../enums';
import { OsBaseComponent } from './component';

@Component({
    template: ''
})
export abstract class OsBaseButtonComponent extends OsBaseComponent {
    /** Is button disabled */
    @Input()
    @HostBinding(`class.${CommonCssClassEnum.Disabled}`)
    public isDisabled: boolean;

    /** Is button focused */
    @Input()
    @HostBinding(`class.${CommonCssClassEnum.Focused}`)
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
    public readonly osFocus: EventEmitter<FocusEvent> = new EventEmitter();

    /** Target internal element blur event */
    @Output()
    public readonly osBlur: EventEmitter<FocusEvent> = new EventEmitter();

    /** @internal */
    @HostBinding('attr.tabindex')
    public get _hostTabIndexAttr(): number | null {
        return (this.isDisabled) ? null : 0;
    }

    /** The handler will be fired on the host element in response to an event. */
    protected onFocus(event: FocusEvent): void {
        this.osFocus.emit(event);
    }

    /** The handler will be fired on the host element in response to an event. */
    protected onBlur(event: FocusEvent): void {
        this.osBlur.emit(event);
    }

    protected initElementEventObservers(element: HTMLElement): void {
        element.onfocus = (event) => this.onFocus(event);
        element.onblur = (event) => this.onBlur(event);

        super.initElementEventObservers(element);
    }
}
