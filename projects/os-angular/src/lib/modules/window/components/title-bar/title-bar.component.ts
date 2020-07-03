import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { OsBaseComponent } from 'os-angular/core';

@Component({
    selector: 'os-title-bar',
    templateUrl: './title-bar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleBarComponent extends OsBaseComponent implements OnInit {

    @Output()
    public OnDblClick = new EventEmitter<MouseEvent>();

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
