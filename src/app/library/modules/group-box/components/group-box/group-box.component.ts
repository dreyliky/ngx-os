import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit } from '@angular/core';
import { OsBaseComponent } from '../../../../core';

@Component({
    selector: 'os-group-box',
    templateUrl: './group-box.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupBoxComponent extends OsBaseComponent implements OnInit {
    @Input()
    public label: string;

    constructor(
        private readonly hostElementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.classListManager.add('os-group-box');
        this.initElementEventObservers(this.hostElementRef.nativeElement);
    }
}
