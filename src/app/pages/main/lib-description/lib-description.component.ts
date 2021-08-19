import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'demo-lib-description',
    templateUrl: './lib-description.component.html',
    styleUrls: ['./lib-description.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LibDescriptionComponent {}
