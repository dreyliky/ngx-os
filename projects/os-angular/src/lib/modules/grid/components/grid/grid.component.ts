import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OsBaseComponent } from 'os-angular/core';

@Component({
    selector: 'os-grid',
    templateUrl: './grid.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridComponent extends OsBaseComponent {

    constructor() {
        super();
    }

}
