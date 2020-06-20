import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { OsBaseComponent } from '../../core';

@Component({
    selector: 'os-window',
    templateUrl: './window.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WindowComponent extends OsBaseComponent implements OnInit {

    @Input()
    public title: string;

    @Input()
    public isMinimizable: boolean = true;

    @Input()
    public isMaximizable: boolean = true;

    @Input()
    public isClosable: boolean = true;

    @Input()
    public scrollViewStyle: any;

    @Input()
    public scrollViewStyleClass: any;

    constructor () {
        super({
            elementName: 'os-window'
        });
    }

    public ngOnInit (): void {
        super.ngOnInit();
    }

}
