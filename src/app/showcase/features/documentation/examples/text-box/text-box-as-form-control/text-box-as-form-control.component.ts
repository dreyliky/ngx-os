import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'demo-text-box-as-form-control',
    templateUrl: './text-box-as-form-control.component.html',
    styleUrls: ['./text-box-as-form-control.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextBoxAsFormControlComponent implements OnInit {
    public formGroup: FormGroup;

    public ngOnInit(): void {
        this.createFormGroup();
    }

    public createFormGroup(): void {
        this.formGroup = new FormGroup({
            textboxValue: new FormControl('Hi there!')
        });
    }
}
