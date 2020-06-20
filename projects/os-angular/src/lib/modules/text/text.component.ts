import { Component, OnInit, Input } from '@angular/core';
import { OsBaseComponent } from '../../core';

@Component({
    selector: 'os-text',
    templateUrl: './text.component.html'
})
export class TextComponent extends OsBaseComponent implements OnInit {

    @Input()
    public size: string = '12px';

    @Input()
    public fontWeight: string = 'normal';

    constructor () {
        super({
            elementName: 'os-text'
        });
    }

    public ngOnInit (): void {
        super.ngOnInit();
    }

}
