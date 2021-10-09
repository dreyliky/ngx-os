import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit } from '@angular/core';
import { OsBaseComponent } from '../../../../core';

@Component({
    selector: 'os-list',
    templateUrl: './list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent extends OsBaseComponent implements OnInit {
    /** Stylelist for scroll view component of the list */
    @Input()
    public scrollViewStyle: object;

    /** Classlist for scroll view component of the list */
    @Input()
    public scrollViewStyleClass: string;

    constructor(
        private readonly hostElementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.classListManager.add('os-list');
        this.initElementEventObservers(this.hostElementRef.nativeElement);
    }
}
