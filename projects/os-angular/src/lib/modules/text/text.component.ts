import { Component, OnInit, Input } from '@angular/core';
import { OsBaseComponent } from '../../core';

@Component({
    selector: 'os-text',
    templateUrl: './text.component.html'
})
export class TextComponent extends OsBaseComponent implements OnInit {

    @Input()
    public size: number = 12;

    @Input()
    public bold: boolean = false;

    constructor () {
        super({
            elementName: 'os-text'
        });
    }

    public ngOnInit (): void {
        super.ngOnInit();
    }

}
