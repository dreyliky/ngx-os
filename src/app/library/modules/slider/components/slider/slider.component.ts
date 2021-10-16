import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostBinding,
    Input,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonCssClassEnum, OsBaseFormControlComponent } from '../../../../core';
import { SliderValueChangeEvent } from '../../interfaces';

@Component({
    selector: 'os-slider',
    templateUrl: './slider.component.html',
    host: {
        'class': 'os-slider'
    },
    encapsulation: ViewEncapsulation.None,
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
    /** Label text near the slider */
    @Input()
    public label: string;

    /** Label text for the minimum value of the slider */
    @Input()
    public minValueLabel: string;

    /** Label text for the maximum value of the slider */
    @Input()
    public maxValueLabel: string;

    /** Is slider disabled? */
    @Input()
    @HostBinding(`class.${CommonCssClassEnum.Disabled}`)
    public isDisabled: boolean;

    /** Minimum possible value of the slider */
    @Input()
    public min: number = 0;

    /** Maximum possible value of the slider */
    @Input()
    public max: number = 100;

    /** Value of the slider */
    @Input()
    public value: number = 0;

    /** Fires when the slider state change */
    @Output()
    public osChange: EventEmitter<SliderValueChangeEvent> = new EventEmitter();

    @ViewChild('slider')
    private readonly inputElementRef: ElementRef<HTMLInputElement>;

    constructor(
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    public ngAfterViewInit(): void {
        this.initElementEventObservers(this.inputElementRef.nativeElement);
    }

    /** @internal */
    public onSliderValueChange(originalEvent: Event): void {
        const targetElement = originalEvent.target as HTMLInputElement;
        const value: number = +targetElement.value;

        this.onChange?.(value);
        this.osChange.emit({ originalEvent, value });
    }

    /** @internal */
    public writeValue(value: number): void {
        this.value = value;

        this.changeDetector.detectChanges();
    }
}
