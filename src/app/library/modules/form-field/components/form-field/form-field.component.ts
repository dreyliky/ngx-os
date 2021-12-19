import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnInit,
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
export class FormFieldComponent extends ɵOsBaseComponent implements OnInit {
    /** Is the label placed above the element or in one row with it? */
    @Input()
    @HostBinding(`class.${CssClass.Stacked}`)
    public isStacked: boolean = false;

    constructor(
        private readonly hostRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.initElementEventObservers(this.hostRef.nativeElement);
    }
}
