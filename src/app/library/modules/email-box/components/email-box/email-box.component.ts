import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input, Optional,
    Output,
    Self,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { ɵOsBaseFieldComponent } from '../../../../core';
import { ɵDEFAULT_EMAIL_VALIDATION_PATTERN } from '../../data';
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
    extends ɵOsBaseFieldComponent
    implements AfterViewInit {
    /** Is native autocomplete for the `input` element enabled? */
    @Input()
    public isAutocompleteEnabled: boolean = false;

    /** RegExp for email validation */
    @Input()
    public pattern: RegExp = ɵDEFAULT_EMAIL_VALIDATION_PATTERN;

    /** Fires when the email-box value change */
    @Output()
    public osChange: EventEmitter<EmailBoxChangeEvent> = new EventEmitter();

    @ViewChild('emailBox')
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
}
