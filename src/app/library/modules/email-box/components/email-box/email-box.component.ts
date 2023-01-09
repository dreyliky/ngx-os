import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
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
export class EmailBoxComponent extends ɵOsBaseFieldComponent implements OnInit {
    /** Is native autocomplete for the `input` element enabled? */
    @Input()
    public isAutocompleteEnabled: boolean = false;

    /** RegExp for email validation */
    @Input()
    public pattern: RegExp = ɵDEFAULT_EMAIL_VALIDATION_PATTERN;

    /** Fires when the email-box value change */
    @Output()
    public osChange: Observable<EmailBoxChangeEvent> = this.createEvent('change')
        .pipe(
            map((event) => this.transformChangeEvent(event))
        );

    /** @internal */
    public get _inputAutocompleteAttrValue(): string {
        return (this.isAutocompleteEnabled) ? '' : 'off';
    }

    protected override targetInternalElementSelector = 'input';

    public ngOnInit(): void {
        this.value = '';

        this.initInputEventObserver();
    }

    private transformChangeEvent(originalEvent: Event): EmailBoxChangeEvent {
        const targetElement = originalEvent.target as HTMLInputElement;
        const value = targetElement.value;
        const isValid = this.pattern.test(value);

        return { originalEvent, value, isValid };
    }

    private initInputEventObserver(): void {
        this.osInput
            .pipe(
                map(({ target }) => (target as HTMLInputElement).value),
                takeUntil(this.viewDestroyed$)
            )
            .subscribe((value) => {
                this.onChange?.(value);
                this.changeDetector.markForCheck();
            });
    }
}
