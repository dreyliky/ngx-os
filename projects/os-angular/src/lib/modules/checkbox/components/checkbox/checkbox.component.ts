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
import { OsBaseComponent } from '@lib-core';

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
export class CheckboxComponent extends OsBaseComponent implements OnInit, ControlValueAccessor {
    @Input()
    public readonly label = '';

    @Input()
    public readonly name = '';

    @Input()
    @HostBinding('class.checked')
    public checked: boolean;

    @Input()
    @HostBinding('class.disabled')
    public readonly isDisabled: boolean;

    @Output()
    public osChange = new EventEmitter<Event>();

    @Output()
    public checkedChange = new EventEmitter<boolean>();

    @ViewChild('checkboxElement')
    private readonly checkboxElementRef: ElementRef<HTMLInputElement>;

    public onChange: (value: boolean) => any;
    public onTouched: () => any;

    constructor(
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    public ngOnInit(): void {
        this.hostClasslistManager.add('os-checkbox');
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

    protected onClick(event: MouseEvent): void {
        this.checkboxElementRef.nativeElement.click();

        this.osClick.emit(event);
    }
}
