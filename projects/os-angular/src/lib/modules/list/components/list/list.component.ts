import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit } from '@angular/core';
import { OsBaseComponent } from '@lib-core';

@Component({
    selector: 'os-list',
    templateUrl: './list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent extends OsBaseComponent implements OnInit {
    @Input()
    public scrollViewStyle: object;

    @Input()
    public scrollViewStyleClass: string;

    constructor(
        private readonly hostElementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.classlistManager.add('os-list');
        this.initElementEventObservers(this.hostElementRef.nativeElement);
    }
}
