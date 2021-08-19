import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'demo-theming',
    templateUrl: './theming.component.html',
    styleUrls: ['./theming.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemingComponent {}
