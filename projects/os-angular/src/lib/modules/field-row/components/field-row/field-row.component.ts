import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnInit } from '@angular/core';
import { OsBaseComponent } from '@lib-core';

@Component({
    selector: 'os-field-row',
    templateUrl: './field-row.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldRowComponent extends OsBaseComponent implements OnInit {
    @Input()
    @HostBinding('class.stacked')
    public stacked: boolean = false;

    constructor(
        private readonly hostElementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.classlistManager.add('os-field-row');
        this.initElementEventObservers(this.hostElementRef.nativeElement);
    }
}
