import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Optional,
    Output,
    Self,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { AbstractControl, NgControl, ValidationErrors } from '@angular/forms';
import { OsBaseFieldComponent } from '../../../../core';
import { EmailBoxChangeEvent } from '../../interfaces';

@Component({
    selector: 'os-email-box',
    templateUrl: './email-box.component.html',
    host: {
        'class': 'os-email-box'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailBoxComponent
    extends OsBaseFieldComponent
    implements OnInit, AfterViewInit {
    /** Is native autocomplete for the `input` element enabled? */
    @Input()
    public isAutocompleteEnabled: boolean = false;

    /** RegExp for email validation */
    @Input()
    public pattern: RegExp =
        /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z].)+[a-zA-Z]{2,9})$/i;

    /** Fires when the email-box value change */
    @Output()
    public osChange: EventEmitter<EmailBoxChangeEvent> = new EventEmitter();

    @ViewChild('emailbox')
    private readonly inputElementRef: ElementRef<HTMLInputElement>;

    /** @internal */
    public get _inputAutocompleteAttrValue(): string {
        return (this.isAutocompleteEnabled) ? '' : 'off';
    }

    constructor(
        @Self() @Optional() controlDir: NgControl,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
        this.initControlDir(controlDir, this);
    }

    public ngOnInit(): void {
        this.initValidators(this.emailValidator.bind(this));
    }

    public ngAfterViewInit(): void {
        this.initElementEventObservers(this.inputElementRef.nativeElement);
        this.autoFocusFieldIfNeeded(this.inputElementRef.nativeElement);
    }

    /** @internal */
    public writeValue(value: string): void {
        this.value = value;

        this.changeDetector.detectChanges();
    }

    protected onFieldValueChange(originalEvent: Event): void {
        const targetElement = originalEvent.target as HTMLInputElement;
        const value = targetElement.value;
        const isValid = this.pattern.test(value);

        this.onChange?.(value);
        this.osChange.emit({ originalEvent, value, isValid });
        this.changeDetector.markForCheck();
    }

    private emailValidator(control: AbstractControl): ValidationErrors | null {
        const isIncorrect = !this.pattern.test(control.value);

        return (isIncorrect) ? { invalid: true } : null;
    }
}
