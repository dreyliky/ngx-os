import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { OsBaseComponent } from '../../../../core';
import { FormFieldCssClassEnum as CssClass } from '../../enums';

@Component({
    selector: 'os-form-field',
    templateUrl: './form-field.component.html',
    host: {
        'class': 'os-form-field'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldComponent extends OsBaseComponent implements OnInit {
    /** Is the label placed above the element or in one row with it? */
    @Input()
    @HostBinding(`class.${CssClass.Stacked}`)
    public isStacked: boolean = false;

    constructor(
        private readonly hostElementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.initElementEventObservers(this.hostElementRef.nativeElement);
    }
}
