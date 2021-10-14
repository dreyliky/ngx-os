import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { OsBaseComponent } from '../../../../core';

@Component({
    selector: 'os-label',
    templateUrl: './label.component.html',
    host: {
        'class': 'os-label os-text'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabelComponent extends OsBaseComponent implements OnInit {
    constructor(
      private readonly hostElementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.initElementEventObservers(this.hostElementRef.nativeElement);
    }
}
