import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

interface MyItem {
    text: string;
    value: number;
}

@Component({
    selector: 'showcase-dropdown-as-form-control',
    templateUrl: './dropdown-as-form-control.component.html',
    styleUrls: ['./dropdown-as-form-control.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownAsFormControlComponent {
    public readonly items: MyItem[] = [
        { text: 'Option 1', value: 1 },
        { text: 'Option 2', value: 2 },
        { text: 'Option 3', value: 3 }
    ];

    public readonly selectedItemControl = new FormControl(this.items[1]);
    public readonly disabledItemControl = new FormControl({ value: null, disabled: true });

    public readonly formGroup = new FormGroup({
        selectedItem: this.selectedItemControl
    });
}
