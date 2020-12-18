import { Component, OnInit, Input } from '@angular/core';
import { OsBaseComponent } from 'os-angular/core';

@Component({
    selector: 'os-text',
    templateUrl: './text.component.html'
})
export class TextComponent extends OsBaseComponent implements OnInit {

    constructor () {
        super({
            elementName: 'os-text'
        });
    }

    public ngOnInit (): void {
        super.ngOnInit();
    }

}
