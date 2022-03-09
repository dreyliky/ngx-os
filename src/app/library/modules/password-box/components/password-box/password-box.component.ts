import {
    ChangeDetectionStrategy,
    Component,
    Injector,
    Input,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ɵOsBaseFieldComponent } from '../../../../core';
import { PasswordBoxChangeEvent } from '../../interfaces';

@Component({
    selector: 'os-password-box',
    templateUrl: './password-box.component.html',
    host: {
        'class': 'os-password-box'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordBoxComponent extends ɵOsBaseFieldComponent implements OnInit {
    /** Is native autocomplete for the `input` element enabled? */
    @Input()
    public isAutocompleteEnabled: boolean = false;

    /** Fires when the password-box value change */
    @Output()
    public osChange: Observable<PasswordBoxChangeEvent> = this.createEvent('change')
        .pipe(
            map((event) => this.transformChangeEvent(event))
        );

    /** @internal */
    public get _inputAutocompleteAttrValue(): string {
        return (this.isAutocompleteEnabled) ? '' : 'off';
    }

    protected targetInternalElementSelector = 'input';

    constructor(
        injector: Injector
    ) {
        super(injector);

        this.value = '';
    }

    public ngOnInit(): void {
        this.initInputEventObserver();
    }

    private transformChangeEvent(originalEvent: Event): PasswordBoxChangeEvent {
        const targetElement = originalEvent.target as HTMLTextAreaElement;
        const value = targetElement.value;

        return { originalEvent, value };
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
