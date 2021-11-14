import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'showcase-slider-as-form-control',
    templateUrl: './slider-as-form-control.component.html',
    styleUrls: ['./slider-as-form-control.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderAsFormControlComponent {
    public readonly sliderControl = new FormControl(10);

    public readonly formGroup = new FormGroup({
        sliderValue: this.sliderControl
    });
}
