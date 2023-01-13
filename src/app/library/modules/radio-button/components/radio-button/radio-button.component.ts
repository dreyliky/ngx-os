import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { ɵCommonCssClassEnum, ɵOsBaseFormControlComponent } from '../../../../core';
import { RadioButtonValueChangeEvent } from '../../interfaces';

@Component({
    selector: 'os-radio-button',
    templateUrl: './radio-button.component.html',
    host: {
        'class': 'os-radio-button'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioButtonComponent<T = any>
    extends ɵOsBaseFormControlComponent<T>
    implements ControlValueAccessor {
    /** Name of the radio-button group */
    @Input()
    public name: string = '';

    /** Data of the radio-button */
    @Input()
    public data: T;

    /** Fires when the radio-button state change */
    @Output()
    public osChange: EventEmitter<RadioButtonValueChangeEvent<T>> = new EventEmitter();

    /** Is radio-button checked? */
    @HostBinding(`class.${ɵCommonCssClassEnum.Checked}`)
    public isChecked: boolean;

    @ViewChild('radioButton')
    private readonly inputElementRef: ElementRef<HTMLInputElement>;

    constructor(
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    /** @internal */
    public override writeValue(value: T): void {
        this.isChecked = (this.data === value);

        this.changeDetector.markForCheck();
    }

    /** @internal */
    public _onRadioButtonChange(originalEvent: Event): void {
        const inputElement = (originalEvent.target as HTMLInputElement);
        this.isChecked = inputElement.checked;

        this.onChange?.(this.data);
        this.osChange.emit({
            originalEvent,
            data: this.data,
            isChecked: this.isChecked
        });
    }

    /** @internal */
    @HostListener('click')
    public _onClick(): void {
        const element = this.inputElementRef.nativeElement;

        if (!this.isDisabled && !element.checked) {
            element.checked = true;

            element.dispatchEvent(new Event('change'));
            element.focus();
        }
    }
}
