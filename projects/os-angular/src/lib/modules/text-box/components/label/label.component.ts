import { ChangeDetectionStrategy, Component, ElementRef, OnInit } from '@angular/core';
import { OsBaseComponent } from '@lib-core';

@Component({
    selector: 'os-label',
    templateUrl: './label.component.html',
    styleUrls: ['./label.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabelComponent extends OsBaseComponent implements OnInit {
    constructor(
        private readonly hostElementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.classlistManager.add('os-label');
        this.initElementEventObservers(this.hostElementRef.nativeElement);
    }
}
