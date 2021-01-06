import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'demo-textarea-overview',
    templateUrl: './textarea-overview.component.html',
    styleUrls: ['./textarea-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextareaOverviewComponent implements OnInit {

    public formGroup: FormGroup;

    constructor() {}

    public ngOnInit(): void {
        this.createFormGroup();
    }

    public createFormGroup(): void {
        this.formGroup = new FormGroup({
            textareaBoxValue: new FormControl('Hi there!')
        });
    }

}
