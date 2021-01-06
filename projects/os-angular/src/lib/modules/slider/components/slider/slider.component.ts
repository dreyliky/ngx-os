import {
    ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, Output
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OsBaseComponent } from 'os-angular/core';
import { SliderValueChangeEvent } from '../../interfaces';

@Component({
    selector: 'os-slider',
    templateUrl: './slider.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SliderComponent),
            multi: true
        }
    ]
})
export class SliderComponent extends OsBaseComponent implements ControlValueAccessor {

    @Input()
    public label: string;

    @Input()
    public minValueLabel: string;

    @Input()
    public maxValueLabel: string;

    @Input()
    public isDisabled: boolean;

    @Input()
    public min: number = 0;

    @Input()
    public max: number = 100;

    @Input()
    public value: number = 0;

    @Output()
    public osChange: EventEmitter<SliderValueChangeEvent> = new EventEmitter();

    constructor(
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    public onSliderValueChange(event: Event): void {
        const targetElement = event.target as HTMLInputElement;
        const sliderValue: number = +targetElement.value;

        this.onChange(sliderValue);
        this.osChange.emit({ event, value: this.value });
    }

    public registerOnChange(fn: () => {}): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => {}): void {
        this.onTouched = fn;
    }

    public writeValue(value: number): void {
        this.value = value;

        this.changeDetector.detectChanges();
    }

    public onChange: any = (): any => {};

    public onTouched: any = (): any => {};

}
