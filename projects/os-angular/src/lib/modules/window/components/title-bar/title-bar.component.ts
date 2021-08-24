import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { OsBaseComponent } from '@lib-core';

@Component({
    selector: 'os-title-bar',
    templateUrl: './title-bar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleBarComponent extends OsBaseComponent implements OnInit {
    @Output()
    public osMinimizeButtonClick = new EventEmitter<MouseEvent>();

    @Output()
    public osMaximizeButtonClick = new EventEmitter<MouseEvent>();

    @Output()
    public osCloseButtonClick = new EventEmitter<MouseEvent>();

    public ngOnInit(): void {
        this.hostClasslistManager.add('os-title-bar');
    }
}
