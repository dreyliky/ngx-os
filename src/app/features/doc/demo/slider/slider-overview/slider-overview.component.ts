import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'demo-slider-overview',
    templateUrl: './slider-overview.component.html',
    styleUrls: ['./slider-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderOverviewComponent implements OnInit {
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
