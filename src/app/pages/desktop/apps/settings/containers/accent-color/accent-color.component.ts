import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'settings-accent-color-section',
    templateUrl: './accent-color.component.html',
    styleUrls: ['./accent-color.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccentColorComponent {}
