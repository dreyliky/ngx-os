import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'settings-background-section',
    templateUrl: './background.component.html',
    styleUrls: ['./background.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackgroundComponent {}
