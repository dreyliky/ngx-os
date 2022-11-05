import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Injector,
    Input,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { filter, map, takeUntil } from 'rxjs/operators';
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
    implements OnInit, ControlValueAccessor {
    /** Name of the checkbox group */
    @Input()
    public name: string = '';

    /** Is checkbox disabled? */
    @Input()
    @HostBinding(`class.${ɵCommonCssClassEnum.Disabled}`)
    public isDisabled: boolean;

    /** Data of the checkbox */
    @Input()
    public data: T;

    /** Fires when the checkbox state change */
    @Output()
    public osChange: EventEmitter<CheckboxValueChangeEvent<T>> = new EventEmitter();

    /** Is checkbox checked? */
    @HostBinding(`class.${ɵCommonCssClassEnum.Checked}`)
    public isChecked: boolean;

    @ViewChild('checkbox')
    private readonly inputElementRef: ElementRef<HTMLInputElement>;

    constructor(
        injector: Injector
    ) {
        super(injector);
    }

    public ngOnInit(): void {
        this.initClickObserver();
    }

    /** @internal */
    public writeValue(value: boolean): void {
        this.isChecked = value;

        this.changeDetector.detectChanges();
    }

    /** @internal */
    public setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;

        this.changeDetector.markForCheck();
    }

    /** @internal */
    public _onCheckboxValueChange(originalEvent: Event): void {
        const inputElement = originalEvent.target as HTMLInputElement;
        this.isChecked = inputElement.checked;

        this.onChange?.(this.isChecked);
        this.osChange.emit({
            originalEvent,
            data: this.data,
            isChecked: this.isChecked
        });
    }

    private initClickObserver(): void {
        this.osClick
            .pipe(
                filter(() => !this.isDisabled),
                map(() => this.inputElementRef.nativeElement),
                takeUntil(this.viewDestroyed$)
            )
            .subscribe((element) => {
                element.checked = !element.checked;

                element.dispatchEvent(new Event('change'));
                element.focus();
            });
    }
}
