import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { OsBaseComponent } from '../../../../core';

@Component({
    selector: 'os-title-bar-content',
    templateUrl: './title-bar-content.component.html',
    host: {
        'class': 'os-title-bar-content'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleBarContentComponent extends OsBaseComponent implements OnInit {
    constructor(
        private readonly hostRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.initElementEventObservers(this.hostRef.nativeElement);
    }
}
