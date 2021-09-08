import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostBinding,
    Input,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OsBaseFormControlComponent } from '@lib-core';
import { CheckboxValueChangeEvent } from '../../interfaces';

@Component({
    selector: 'os-checkbox',
    templateUrl: './checkbox.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckboxComponent),
            multi: true
        }
    ]
})
export class CheckboxComponent<T>
    extends OsBaseFormControlComponent<boolean>
    implements OnInit, ControlValueAccessor {
    @Input()
    public readonly label: string = '';

    @Input()
    public readonly name: string = '';

    @Input()
    @HostBinding('class.checked')
    public checked: boolean;

    @Input()
    @HostBinding('class.disabled')
    public readonly isDisabled: boolean;

    @Input()
    public readonly value: T;

    @Output()
    public osChange: EventEmitter<CheckboxValueChangeEvent<T>> = new EventEmitter();

    /** Emits when `checked` state changed. Might be used for two way binding */
    @Output()
    public checkedChange: EventEmitter<boolean> = new EventEmitter();

    @ViewChild('checkbox')
    private readonly checkboxElementRef: ElementRef<HTMLInputElement>;

    constructor(
        private readonly hostElementRef: ElementRef<HTMLElement>,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    public ngOnInit(): void {
        this.classlistManager.add('os-checkbox');
        this.initElementEventObservers(this.hostElementRef.nativeElement);
    }

    public onCheckboxValueChange(originalEvent: Event): void {
        const inputElement = originalEvent.target as HTMLInputElement;

        this.onChange?.(inputElement.checked);
        this.checkedChange.emit(inputElement.checked);
        this.osChange.emit({
            originalEvent,
            value: this.value,
            checked: inputElement.checked
        });
    }

    public writeValue(value: boolean): void {
        this.checked = value;

        this.changeDetector.detectChanges();
    }

    protected onClick(event: PointerEvent): void {
        this.checkboxElementRef.nativeElement.click();
        super.onClick(event);
    }
}
