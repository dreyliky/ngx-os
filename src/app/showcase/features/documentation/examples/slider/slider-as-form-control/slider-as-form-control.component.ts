import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'showcase-slider-as-form-control',
    templateUrl: './slider-as-form-control.component.html',
    styleUrls: ['./slider-as-form-control.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderAsFormControlComponent {
    public readonly formGroup = new FormGroup({
        sliderValue: new FormControl(10)
    });
}
