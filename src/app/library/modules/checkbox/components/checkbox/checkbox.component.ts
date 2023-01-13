import {
    ChangeDetectionStrategy,
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
import { CheckboxValueChangeEvent } from '../../interfaces';

@Component({
    selector: 'os-checkbox',
    templateUrl: './checkbox.component.html',
    host: {
        'class': 'os-checkbox'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent<T = any>
    extends ɵOsBaseFormControlComponent<boolean>
    implements ControlValueAccessor {
    /** Name of the checkbox group */
    @Input()
    public name: string = '';

    /** Data of the checkbox */
    @Input()
    public data: T;

    /** Fires when the checkbox state change */
    @Output()
    public osChange: EventEmitter<CheckboxValueChangeEvent<T>> = new EventEmitter();

    /** Is checkbox checked? */
    @HostBinding(`class.${ɵCommonCssClassEnum.Checked}`)
    public override value: boolean;

    @ViewChild('checkbox')
    private readonly checkboxElementRef: ElementRef<HTMLInputElement>;

    /** @internal */
    public _onCheckboxValueChange(originalEvent: Event): void {
        const inputElement = originalEvent.target as HTMLInputElement;
        this.value = inputElement.checked;

        this.onChange?.(this.value);
        this.osChange.emit({
            originalEvent,
            data: this.data,
            isChecked: this.value
        });
    }

    /** @internal */
    @HostListener('click')
    public _onClick(): void {
        if (!this.isDisabled) {
            const element = this.checkboxElementRef.nativeElement;
            element.checked = !element.checked;

            element.dispatchEvent(new Event('change'));
            element.focus();
        }
    }
}
