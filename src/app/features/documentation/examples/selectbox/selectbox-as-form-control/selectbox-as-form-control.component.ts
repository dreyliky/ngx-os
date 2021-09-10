import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

interface MyItem {
    text: string;
    value: number;
}

@Component({
    selector: 'demo-selectbox-as-form-control',
    templateUrl: './selectbox-as-form-control.component.html',
    styleUrls: ['./selectbox-as-form-control.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectboxAsFormControlComponent implements OnInit {
    public items: MyItem[] = [
        { text: 'Option 1', value: 1 },
        { text: 'Option 2', value: 2 },
        { text: 'Option 3', value: 3 }
    ];

    public formGroup: FormGroup;

    public ngOnInit(): void {
        this.createFormGroup();
    }

    public createFormGroup(): void {
        this.formGroup = new FormGroup({
            selectedItem: new FormControl(this.items[1])
        });
    }
}
