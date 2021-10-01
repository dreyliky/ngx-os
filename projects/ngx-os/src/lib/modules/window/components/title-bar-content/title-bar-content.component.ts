import { ChangeDetectionStrategy, Component, ElementRef, OnInit } from '@angular/core';
import { OsBaseComponent } from '@lib-core';

@Component({
    selector: 'os-title-bar-content',
    templateUrl: './title-bar-content.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleBarContentComponent extends OsBaseComponent implements OnInit {
    constructor(
        private readonly hostRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.classListManager.add('os-title-bar-content');
        this.initElementEventObservers(this.hostRef.nativeElement);
    }
}
