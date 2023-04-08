import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

interface Item {
    text: string;
}

@Component({
    selector: 'showcase-radio-button-as-form-control',
    templateUrl: './radio-button-as-form-control.component.html',
    styleUrls: ['./radio-button-as-form-control.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioButtonAsFormControlComponent {
    public readonly items: Item[] = [
        { text: 'Item 1' },
        { text: 'Item 2' },
        { text: 'Item 3' }
    ];

    public readonly selectedValueControl = new UntypedFormControl(this.items[1]);
    public readonly radioButtonDisabledControl = new UntypedFormControl({
        value: true,
        disabled: true
    });

    public readonly formGroup = new UntypedFormGroup({
        selectedValue: this.selectedValueControl
    });
}
