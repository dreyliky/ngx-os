import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'demo-main-layout',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent {}
