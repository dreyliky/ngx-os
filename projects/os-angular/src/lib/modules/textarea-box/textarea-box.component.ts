import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { IdGenerator } from '../../helpers';
import { OsBaseFieldComponent } from '../../core';

@Component({
    selector: 'os-textarea-box',
    templateUrl: './textarea-box.component.html',
    styleUrls: ['./textarea-box.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextareaBoxComponent extends OsBaseFieldComponent implements OnInit {

    @Input()
    public rows: number;

    @Input()
    public cols: number;

    constructor () {
        super();
    }

    public ngOnInit (): void {
        super.ngOnInit();
    }

}
