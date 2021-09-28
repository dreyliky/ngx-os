import { ChangeDetectionStrategy, Component, ElementRef, OnInit } from '@angular/core';
import { OsBaseComponent } from '@lib-core';

@Component({
    selector: 'os-label',
    templateUrl: './label.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabelComponent extends OsBaseComponent implements OnInit {
    constructor(
      private readonly hostElementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.classListManager.add('os-label os-text');
        this.initElementEventObservers(this.hostElementRef.nativeElement);
    }
}
