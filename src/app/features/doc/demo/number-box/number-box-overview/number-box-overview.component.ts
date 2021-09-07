import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'demo-number-box-overview',
    templateUrl: './number-box-overview.component.html',
    styleUrls: ['./number-box-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberBoxOverviewComponent implements OnInit {
    public formGroup: FormGroup;

    public ngOnInit(): void {
        this.createFormGroup();
    }

    public createFormGroup(): void {
        this.formGroup = new FormGroup({
            textareaBoxValue: new FormControl()
        });
    }
}
