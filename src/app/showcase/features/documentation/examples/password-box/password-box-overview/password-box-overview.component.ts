import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'demo-password-box-overview',
    templateUrl: './password-box-overview.component.html',
    styleUrls: ['./password-box-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordBoxOverviewComponent implements OnInit {
    public formGroup: FormGroup;

    public ngOnInit(): void {
        this.createFormGroup();
    }

    public createFormGroup(): void {
        this.formGroup = new FormGroup({
            passwordBoxValue: new FormControl()
        });
    }
}
