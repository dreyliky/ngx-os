import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Input,
    ViewEncapsulation
} from '@angular/core';
import { ɵOsBaseViewComponent } from '../../../../core';
import { ɵFormFieldCssClassEnum as CssClass } from '../../enums';

@Component({
    selector: 'os-form-field',
    templateUrl: 'form-field.component.html',
    host: {
        'class': 'os-form-field'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldComponent extends ɵOsBaseViewComponent {
    /** Is the label placed above the element or in one row with it? */
    @Input()
    @HostBinding(`class.${CssClass.Stacked}`)
    public isStacked: boolean = false;
}
