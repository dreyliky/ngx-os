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
import { TextBoxChangeEvent } from '../../interfaces';

@Component({
    selector: 'os-text-box',
    templateUrl: './text-box.component.html',
    host: {
        'class': 'os-text-box'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextBoxComponent extends ɵOsBaseFieldComponent implements OnInit {
    /** Is native autocomplete for the `input` element enabled? */
    @Input()
    public isAutocompleteEnabled: boolean = false;

    /** Fires when the text-box value change */
    @Output()
    public osChange: Observable<TextBoxChangeEvent> = this.createEvent('change')
        .pipe(
            map((event) => this.transformChangeEvent(event))
        );

    /** @internal */
    public get _inputAutocompleteAttrValue(): string {
        return (this.isAutocompleteEnabled) ? '' : 'off';
    }

    protected targetInternalElementSelector = 'input';

    public ngOnInit(): void {
        this.value = '';

        this.initInputEventObserver();
    }

    private transformChangeEvent(originalEvent: Event): TextBoxChangeEvent {
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
