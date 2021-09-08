import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    Output,
    ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OsBaseFormControlComponent } from '@lib-core';
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
export class SliderComponent
    extends OsBaseFormControlComponent<number>
    implements AfterViewInit, ControlValueAccessor {
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

    @ViewChild('slider')
    private readonly sliderElementRef: ElementRef<HTMLInputElement>;

    constructor(
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    public ngAfterViewInit(): void {
        this.initElementEventObservers(this.sliderElementRef.nativeElement);
    }

    public onSliderValueChange(originalEvent: Event): void {
        const targetElement = originalEvent.target as HTMLInputElement;
        const value: number = +targetElement.value;

        this.onChange?.(value);
        this.osChange.emit({ originalEvent, value });
    }

    public writeValue(value: number): void {
        this.value = value;

        this.changeDetector.detectChanges();
    }
}
