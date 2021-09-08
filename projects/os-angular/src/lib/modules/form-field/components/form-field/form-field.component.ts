import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnInit } from '@angular/core';
import { OsBaseComponent } from '@lib-core';

@Component({
    selector: 'os-form-field',
    templateUrl: './form-field.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldComponent extends OsBaseComponent implements OnInit {
    @Input()
    @HostBinding('class.stacked')
    public stacked: boolean = false;

    constructor(
        private readonly hostElementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.classlistManager.add('os-form-field');
        this.initElementEventObservers(this.hostElementRef.nativeElement);
    }
}
