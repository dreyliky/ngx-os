import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit } from '@angular/core';
import { OsBaseComponent } from '@lib-core';

@Component({
    selector: 'os-field-row',
    templateUrl: './field-row.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldRowComponent extends OsBaseComponent implements OnInit {
    @Input()
    public stacked: boolean = false;

    constructor(
        private readonly hostElementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.initElementEventObservers(this.hostElementRef.nativeElement);
    }
}
