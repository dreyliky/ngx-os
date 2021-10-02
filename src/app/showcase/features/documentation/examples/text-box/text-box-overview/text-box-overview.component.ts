import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'showcase-text-box-overview',
    templateUrl: './text-box-overview.component.html',
    styleUrls: ['./text-box-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextBoxOverviewComponent implements OnInit {
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
