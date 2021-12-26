import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Injector,
    Input,
    ViewEncapsulation
} from '@angular/core';
import { ɵOsBaseComponent } from '../../../../core';
import { ɵFormFieldCssClassEnum as CssClass } from '../../enums';

@Component({
    selector: 'os-form-field',
    template: '<ng-content></ng-content>',
    host: {
        'class': 'os-form-field'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldComponent extends ɵOsBaseComponent {
    /** Is the label placed above the element or in one row with it? */
    @Input()
    @HostBinding(`class.${CssClass.Stacked}`)
    public isStacked: boolean = false;

    constructor(
        injector: Injector
    ) {
        super(injector);
    }
}
