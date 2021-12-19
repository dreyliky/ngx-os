import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Optional,
    Output,
    Self,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { NgControl } from '@angular/forms';
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
export class TextBoxComponent extends ɵOsBaseFieldComponent implements AfterViewInit {
    /** Is native autocomplete for the `input` element enabled? */
    @Input()
    public isAutocompleteEnabled: boolean = false;

    /** Fires when the text-box value change */
    @Output()
    public osChange: EventEmitter<TextBoxChangeEvent> = new EventEmitter();

    @ViewChild('textBox')
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
        const value: string = targetElement.value;

        this.onChange?.(value);
        this.osChange.emit({ originalEvent, value });
        this.changeDetector.markForCheck();
    }
}
