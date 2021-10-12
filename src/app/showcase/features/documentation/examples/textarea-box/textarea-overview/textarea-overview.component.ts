import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'showcase-textarea-overview',
    templateUrl: './textarea-overview.component.html',
    styleUrls: ['./textarea-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextareaOverviewComponent {
    public readonly formGroup = new FormGroup({
        textareaBoxValue: new FormControl('Hi there!')
    });
}
