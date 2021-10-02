import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'showcase-api',
    templateUrl: './api.component.html',
    styleUrls: ['./api.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApiComponent {}
