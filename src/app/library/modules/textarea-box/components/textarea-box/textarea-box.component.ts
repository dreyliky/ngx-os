import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Injector,
    Input,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ɵOsBaseFieldComponent } from '../../../../core';
import { TextareaBoxChangeEvent } from '../../interfaces';

@Component({
    selector: 'os-textarea-box',
    templateUrl: './textarea-box.component.html',
    host: {
        'class': 'os-textarea-box'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextareaBoxComponent
    extends ɵOsBaseFieldComponent
    implements OnInit, ControlValueAccessor {
    /** Specifies the visible height of a textarea-box, in lines. */
    @Input()
    public rows: number;

    /** Specifies the visible width of a textarea-box, in lines. */
    @Input()
    public cols: number;

    /** Fires when the textarea-box value change */
    @Output()
    public osChange: Observable<TextareaBoxChangeEvent> = this.createEvent('change')
        .pipe(
            map((event) => this.transformChangeEvent(event))
        );

    protected targetInternalElementSelector = 'textarea';

    constructor(
        injector: Injector,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super(injector);
    }

    public ngOnInit(): void {
        this.initValueChangeObserver();
    }

    /** @internal */
    public writeValue(value: string): void {
        this.value = value;

        this.changeDetector.detectChanges();
    }

    private transformChangeEvent(originalEvent: Event): TextareaBoxChangeEvent {
        const targetElement = originalEvent.target as HTMLTextAreaElement;
        const value = targetElement.value;

        return { originalEvent, value };
    }

    private initValueChangeObserver(): void {
        this.osChange
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe(({ value }) => {
                this.onChange?.(value);
                this.changeDetector.markForCheck();
            });
    }
}
