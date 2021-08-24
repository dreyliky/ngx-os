import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { OsBaseButtonComponent } from '@lib-core';
import { buttonType } from '../../shared';

@Component({
    selector: 'os-button',
    templateUrl: './button.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent extends OsBaseButtonComponent implements OnInit {
    @Input()
    public type: buttonType = 'button';

    public ngOnInit(): void {
        this.hostClasslistManager.add('os-button');
    }
}
