import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'showcase-text-box-overview',
    templateUrl: './text-box-overview.component.html',
    styleUrls: ['./text-box-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextBoxOverviewComponent {
    public readonly formGroup = new FormGroup({
        textboxValue: new FormControl('Hi there!')
    });
}
