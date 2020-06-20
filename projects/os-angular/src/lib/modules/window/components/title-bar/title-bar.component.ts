import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { OsBaseComponent } from 'projects/os-angular/src/lib/core';

@Component({
    selector: 'os-title-bar',
    templateUrl: './title-bar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleBarComponent extends OsBaseComponent implements OnInit {

    @Output()
    public OnMinimizeButtonClick = new EventEmitter<MouseEvent>();

    @Output()
    public OnMaximizeButtonClick = new EventEmitter<MouseEvent>();

    @Output()
    public OnCloseButtonClick = new EventEmitter<MouseEvent>();

    constructor () {
        super({
            elementName: 'os-title-bar'
        });
    }

    public ngOnInit (): void {
        super.ngOnInit();
    }

}
