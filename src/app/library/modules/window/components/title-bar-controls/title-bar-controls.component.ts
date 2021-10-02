import { ChangeDetectionStrategy, Component, ElementRef, OnInit } from '@angular/core';
import { OsBaseComponent } from '../../../../core';

@Component({
    selector: 'os-title-bar-controls',
    templateUrl: './title-bar-controls.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleBarControlsComponent extends OsBaseComponent implements OnInit {
    constructor(
        private readonly hostRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.classListManager.add('os-title-bar-controls');
        this.initElementEventObservers(this.hostRef.nativeElement);
    }
}
