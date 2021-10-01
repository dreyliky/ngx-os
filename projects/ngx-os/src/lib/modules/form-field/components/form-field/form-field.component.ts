import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnInit } from '@angular/core';
import { OsBaseComponent } from '@lib-core';
import { FormFieldCssClassEnum as CssClass } from '../../enums';

@Component({
    selector: 'os-form-field',
    templateUrl: './form-field.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldComponent extends OsBaseComponent implements OnInit {
    @Input()
    @HostBinding(`class.${CssClass.Stacked}`)
    public isStacked: boolean = false;

    constructor(
        private readonly hostElementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.classListManager.add('os-form-field');
        this.initElementEventObservers(this.hostElementRef.nativeElement);
    }
}
