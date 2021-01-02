import {
    ChangeDetectionStrategy, Component, Input, OnInit
} from '@angular/core';
import { OsBaseComponent } from 'os-angular/core';

@Component({
    selector: 'os-options',
    templateUrl: './options.component.html',
    styleUrls: ['./options.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionsComponent extends OsBaseComponent implements OnInit {

    @Input()
    public scrollViewStyle: object;

    @Input()
    public scrollViewStyleClass: string;

    constructor() {
        super();
    }

    public ngOnInit(): void {}

}
