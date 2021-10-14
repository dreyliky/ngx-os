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
    public readonly isDisabled: boolean;

    /** Is button focused */
    @Input()
    @HostBinding(`class.${CommonCssClassEnum.Focused}`)
    public readonly isFocused: boolean;

    /** Metadata of destination of the button */
    @Input()
    @HostBinding('attr.aria-label')
    public readonly ariaLabel: string;

    /** Metadata of relation of the button */
    @Input()
    @HostBinding('attr.aria-controls')
    public readonly ariaControls: string;

    /** Metadata of selection state of the button */
    @Input()
    @HostBinding('attr.aria-selected')
    public readonly ariaSelected: string;

    /** Metadata of role of the button */
    @Input()
    @HostBinding('attr.role')
    public role: string;

    /** Target internal element focus event */
    @Output()
    public readonly osFocus: EventEmitter<MouseEvent> = new EventEmitter();

    /** Target internal element blur event */
    @Output()
    public readonly osBlur: EventEmitter<MouseEvent> = new EventEmitter();

    /** @internal */
    @HostBinding('attr.tabindex')
    public get _hostTabIndexAttr(): number {
        return (this.isDisabled) ? null : 0;
    }

    /** The handler will be fired on the host element in response to an event. */
    protected onFocus(event: MouseEvent): void {
        this.osFocus.emit(event);
    }

    /** The handler will be fired on the host element in response to an event. */
    protected onBlur(event: MouseEvent): void {
        this.osBlur.emit(event);
    }

    protected initElementEventObservers(element: HTMLElement): void {
        element.onfocus = (event: MouseEvent) => this.onFocus(event);
        element.onblur = (event: MouseEvent) => this.onBlur(event);

        super.initElementEventObservers(element);
    }
}
