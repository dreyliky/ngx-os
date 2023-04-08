import {
    AfterViewInit,
    Component,
    HostBinding,
    Injector,
    Input,
    Output
} from '@angular/core';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ɵCommonCssClassEnum } from '../../enums';
import { ɵOsBaseFormControlComponent } from './form-control-element';

@Component({
    template: ''
})
export abstract class ɵOsBaseFieldComponent<T = string, OutputT = string>
    extends ɵOsBaseFormControlComponent<T, OutputT>
    implements AfterViewInit {
    /** Is field disabled? */
    @Input()
    @HostBinding(`class.${ɵCommonCssClassEnum.Disabled}`)
    public isDisabled: boolean = false;

    /** Is field readonly? */
    @Input()
    @HostBinding(`class.${ɵCommonCssClassEnum.Readonly}`)
    public isReadonly: boolean = false;

    /** Is field autofocused? */
    @Input()
    public isAutofocused: boolean = false;

    /** Placeholder text of the field */
    @Input()
    public placeholder: string = '';

    /** Name of the field group */
    @Input()
    public name: string;

    /** Native `input` size property */
    @Input()
    public size: number;

    /** The handler will be fired on the internal element in response to an event. */
    @Output()
    public osFocus: Observable<FocusEvent> = this.createEvent('focus');

    /** The handler will be fired on the internal element in response to an event. */
    @Output()
    public osBlur: Observable<FocusEvent> = this.createEvent('blur');

    /** The handler will be fired on the internal element in response to an event. */
    @Output()
    public osInput: Observable<InputEvent> = this.createEvent('input');

    /**
     * @internal
     * Each field-component must define it's own `osChange` output with specific event type.
     **/
    public abstract osChange: Observable<unknown>;

    constructor(
        injector: Injector
    ) {
        super(injector);
    }

    public ngAfterViewInit(): void {
        super.ngAfterViewInit();
        this.initBlurEventObserver();
        this.autoFocusFieldIfNeeded();
    }

    private autoFocusFieldIfNeeded(): void {
        if (this.isAutofocused) {
            this.targetInternalElement.focus();
        }
    }

    private initBlurEventObserver(): void {
        this.osBlur
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe(() => {
                this.onTouched?.();
                this.changeDetector.markForCheck();
            });
    }
}
