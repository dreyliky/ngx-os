import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { textboxType } from './shared';
import { OsBaseFieldComponent } from '../../core';

@Component({
    selector: 'os-text-box',
    templateUrl: './text-box.component.html',
    styleUrls: ['./text-box.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextBoxComponent extends OsBaseFieldComponent implements OnInit {

    @Input()
    public type: textboxType = 'text';

    constructor () {
        super();
    }

    public ngOnInit (): void {
        super.ngOnInit();
    }

}
