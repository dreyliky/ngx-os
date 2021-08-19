import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    forwardRef,
    Input,
    Output
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OsBaseComponent } from 'os-angular/core';

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
export class CheckboxComponent extends OsBaseComponent implements ControlValueAccessor {
    @Input()
    public label: string;

    @Input()
    public name: string;

    @Input()
    public checked: boolean;

    @Input()
    public isDisabled: boolean;

    @Output()
    public osChange = new EventEmitter<Event>();

    @Output()
    public checkedChange = new EventEmitter<boolean>();

    public onChange: (value: boolean) => any;
    public onTouched: () => any;

    constructor(
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    public onCheckboxValueChange(event: Event): void {
        const target = event.target as HTMLInputElement;

        this.osChange.emit(event);
        this.checkedChange.emit(target.checked);
        this.onChange?.(target.checked);
    }

    public registerOnChange(fn: () => any): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => any): void {
        this.onTouched = fn;
    }

    public writeValue(value: boolean): void {
        this.checked = value;

        this.changeDetector.detectChanges();
    }
}
