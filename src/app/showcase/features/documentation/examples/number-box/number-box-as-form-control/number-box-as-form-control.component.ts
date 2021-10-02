import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'showcase-number-box-as-form-control',
    templateUrl: './number-box-as-form-control.component.html',
    styleUrls: ['./number-box-as-form-control.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberBoxAsFormControlComponent implements OnInit {
    public formGroup: FormGroup;

    public ngOnInit(): void {
        this.createFormGroup();
    }

    public createFormGroup(): void {
        this.formGroup = new FormGroup({
            numberBoxValue: new FormControl()
        });
    }
}
