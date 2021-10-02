import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'demo-slider-as-form-control',
    templateUrl: './slider-as-form-control.component.html',
    styleUrls: ['./slider-as-form-control.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderAsFormControlComponent implements OnInit {
    public formGroup: FormGroup;

    public ngOnInit(): void {
        this.createFormGroup();
    }

    public createFormGroup(): void {
        this.formGroup = new FormGroup({
            sliderValue: new FormControl(10)
        });
    }
}
