import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'demo-checkbox-as-form-control',
    templateUrl: './checkbox-as-form-control.component.html',
    styleUrls: ['./checkbox-as-form-control.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxAsFormControlComponent implements OnInit {
    public formGroup: FormGroup;

    public ngOnInit(): void {
        this.initFormGroup();
    }

    private initFormGroup(): void {
        this.formGroup = new FormGroup({
            checkbox1: new FormControl(false),
            checkbox2: new FormControl(true)
        });
    }
}
