import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'demo-checkbox-overview',
    templateUrl: './checkbox-overview.component.html',
    styleUrls: ['./checkbox-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxOverviewComponent implements OnInit {
    public formGroup: FormGroup;

    public simpleCheckbox1Value: boolean = true;
    public simpleCheckbox2Value: boolean = true;

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
