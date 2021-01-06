import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OsBaseComponent } from 'os-angular/core';

@Component({
    selector: 'os-grid',
    templateUrl: './grid.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'class': 'os-element os-grid',
        '[class]': 'styleClass',
        '[id]': 'id',
        '[style]': 'style'
    }
})
export class GridComponent extends OsBaseComponent {

    constructor() {
        super();
    }

}
