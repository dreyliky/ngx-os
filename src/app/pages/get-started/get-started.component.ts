import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'demo-get-started',
    templateUrl: './get-started.component.html',
    styleUrls: ['./get-started.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GetStartedComponent {}
