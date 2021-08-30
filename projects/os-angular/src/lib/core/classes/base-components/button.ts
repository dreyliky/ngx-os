import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { OsBaseComponent } from './element';

@Component({
    template: ''
})
export class OsBaseButtonComponent extends OsBaseComponent {
    @Input()
    @HostBinding('class.disabled')
    public isDisabled: boolean;

    @Input()
    @HostBinding('class.focused')
    public isFocused: boolean;

    @Input()
    @HostBinding('attr.aria-label')
    public ariaLabel: string;

    @Input()
    @HostBinding('attr.aria-controls')
    public ariaControls: string;

    @Input()
    @HostBinding('attr.aria-selected')
    public ariaSelected: string;

    @Input()
    @HostBinding('attr.role')
    public role: string;

    /**
     * Target internal element focus event
     */
    @Output()
    public osFocus: EventEmitter<MouseEvent> = new EventEmitter();

    /**
     * Target internal element blur event
     */
    @Output()
    public osBlur: EventEmitter<MouseEvent> = new EventEmitter();

    @HostBinding('attr.tabindex')
    protected get hostTabIndexAttr(): number {
        return (this.isDisabled) ? null : 0;
    }

    /** The handler will be fired on the host element in response to an event. */
    @HostListener('focus', ['$event'])
    protected onFocus(event: MouseEvent): void {
        this.osFocus.emit(event);
    }

    /** The handler will be fired on the host element in response to an event. */
    @HostListener('blur', ['$event'])
    protected onBlur(event: MouseEvent): void {
        this.osBlur.emit(event);
    }
}
