import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { OsBaseComponent } from '@core';

@Component({
    selector: 'os-title-bar',
    templateUrl: './title-bar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleBarComponent extends OsBaseComponent {
    @Output()
    public osDblClick = new EventEmitter<MouseEvent>();

    @Output()
    public osMinimizeButtonClick = new EventEmitter<MouseEvent>();

    @Output()
    public osMaximizeButtonClick = new EventEmitter<MouseEvent>();

    @Output()
    public osCloseButtonClick = new EventEmitter<MouseEvent>();
}
