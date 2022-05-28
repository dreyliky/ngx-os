import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { filter, map, takeUntil } from 'rxjs/operators';
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
    implements OnInit, ControlValueAccessor {
    /** Name of the radio-button group */
    @Input()
    public name: string = '';

    /** Is radio-button checked? */
    @Input()
    @HostBinding(`class.${ɵCommonCssClassEnum.Checked}`)
    public isChecked: boolean;

    /** Is radio-button disabled? */
    @Input()
    @HostBinding(`class.${ɵCommonCssClassEnum.Disabled}`)
    public isDisabled: boolean;

    /** Data of the radio-button */
    @Input()
    public data: T;

    /** Fires when the radio-button state change */
    @Output()
    public osChange: EventEmitter<RadioButtonValueChangeEvent<T>> = new EventEmitter();

    /** Fires when `checked` state changed. Might be used for two way binding */
    @Output()
    public isCheckedChange: EventEmitter<boolean> = new EventEmitter();

    @ViewChild('radioButton')
    private readonly inputElementRef: ElementRef<HTMLInputElement>;

    public ngOnInit(): void {
        this.initClickObserver();
    }

    /** @internal */
    public writeValue(value: T): void {
        this.isChecked = (this.data === value);

        this.changeDetector.detectChanges();
    }

    /** @internal */
    public _onRadioButtonChange(originalEvent: Event): void {
        const inputElement = originalEvent.target as HTMLInputElement;

        this.onChange?.(this.data);
        this.isCheckedChange.emit(inputElement.checked);
        this.osChange.emit({
            originalEvent,
            data: this.data,
            isChecked: inputElement.checked
        });
    }

    private initClickObserver(): void {
        this.osClick
            .pipe(
                map(() => this.inputElementRef.nativeElement),
                filter((element) => !this.isDisabled && !element.checked),
                takeUntil(this.viewDestroyed$)
            )
            .subscribe((element) => {
                element.checked = true;

                element.dispatchEvent(new Event('change'));
                element.focus();
            });
    }
}
