import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ScrollViewComponent } from 'ngx-os';
import { MAIN_LAYOUT } from './main-layout.constants';

@Component({
    selector: 'showcase-main-layout',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: MAIN_LAYOUT,
            useExisting: MainLayoutComponent
        }
    ]
})
export class MainLayoutComponent {
    @ViewChild(ScrollViewComponent, { static: true })
    public readonly scrollView: ScrollViewComponent;
}
