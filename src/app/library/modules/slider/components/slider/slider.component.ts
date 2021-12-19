import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    Optional,
    Output,
    Self,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { ɵCommonCssClassEnum, ɵOsBaseFormControlComponent } from '../../../../core';
import { SliderValueChangeEvent } from '../../interfaces';

@Component({
    selector: 'os-slider',
    templateUrl: './slider.component.html',
    host: {
        'class': 'os-slider'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderComponent
    extends ɵOsBaseFormControlComponent<number>
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
    @HostBinding(`class.${ɵCommonCssClassEnum.Disabled}`)
    public isDisabled: boolean;

    /** Minimum possible value of the slider */
    @Input()
    public min: number = 0;

    /** Maximum possible value of the slider */
    @Input()
    public max: number = 100;

    /** Fires when the slider state change */
    @Output()
    public osChange: EventEmitter<SliderValueChangeEvent> = new EventEmitter();

    @ViewChild('slider')
    private readonly inputElementRef: ElementRef<HTMLInputElement>;

    /** Value of the slider */
    public value: number = 0;

    constructor(
        @Self() @Optional() controlDir: NgControl,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
        this.initControlDir(controlDir, this);
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
