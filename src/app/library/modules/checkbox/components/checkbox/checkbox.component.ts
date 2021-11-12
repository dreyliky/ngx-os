import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    OnInit,
    Optional,
    Output,
    Self,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { CommonCssClassEnum, OsBaseFormControlComponent } from '../../../../core';
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
    extends OsBaseFormControlComponent<boolean>
    implements OnInit, ControlValueAccessor {
    /** Name of the checkbox group */
    @Input()
    public name: string = '';

    /** Is checkbox disabled? */
    @Input()
    @HostBinding(`class.${CommonCssClassEnum.Disabled}`)
    public isDisabled: boolean;

    /** Data of the checkbox */
    @Input()
    public data: T;

    /** Fires when the checkbox state change */
    @Output()
    public osChange: EventEmitter<CheckboxValueChangeEvent<T>> = new EventEmitter();

    /** Is checkbox checked? */
    @HostBinding(`class.${CommonCssClassEnum.Checked}`)
    public isChecked: boolean;

    @ViewChild('checkbox')
    private readonly inputElementRef: ElementRef<HTMLInputElement>;

    constructor(
        @Self() @Optional() controlDir: NgControl,
        private readonly hostRef: ElementRef<HTMLElement>,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
        this.initControlDir(controlDir, this);
    }

    public ngOnInit(): void {
        this.initElementEventObservers(this.hostRef.nativeElement);
    }

    public onCheckboxValueChange(originalEvent: Event): void {
        const inputElement = originalEvent.target as HTMLInputElement;
        this.isChecked = inputElement.checked;

        this.onChange?.(this.isChecked);
        this.osChange.emit({
            originalEvent,
            data: this.data,
            isChecked: this.isChecked
        });
    }

    public writeValue(value: boolean): void {
        this.isChecked = value;

        this.changeDetector.markForCheck();
    }

    protected onClick(event: PointerEvent): void {
        if (!this.isDisabled) {
            const currentState = this.inputElementRef.nativeElement.checked;
            this.inputElementRef.nativeElement.checked = !currentState;

            this.inputElementRef.nativeElement.dispatchEvent(new Event('change'));
            this.inputElementRef.nativeElement.focus();
            super.onClick(event);
        }
    }
}
