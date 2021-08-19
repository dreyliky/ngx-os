import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

interface Item {
    text: string;
}

@Component({
    selector: 'demo-radio-button-overview',
    templateUrl: './radio-button-overview.component.html',
    styleUrls: ['./radio-button-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioButtonOverviewComponent implements OnInit {
    public items: Item[] = [
        { text: 'Item 1' },
        { text: 'Item 2' },
        { text: 'Item 3' }
    ];

    public formGroup: FormGroup;

    public ngOnInit(): void {
        this.createFormGroup();
    }

    public createFormGroup(): void {
        this.formGroup = new FormGroup({
            selectedValue: new FormControl(this.items[1])
        });
    }
}
