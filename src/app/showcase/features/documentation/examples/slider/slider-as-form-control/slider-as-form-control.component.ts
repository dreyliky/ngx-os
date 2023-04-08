import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
    selector: 'showcase-slider-as-form-control',
    templateUrl: './slider-as-form-control.component.html',
    styleUrls: ['./slider-as-form-control.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderAsFormControlComponent {
    public readonly sliderControl = new UntypedFormControl(10);
    public readonly sliderDisabledControl = new UntypedFormControl({ value: 0, disabled: true });

    public readonly formGroup = new UntypedFormGroup({
        sliderValue: this.sliderControl
    });
}
