import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
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

    @HostBinding('attr.tabindex')
    protected readonly hostTabindexAttr = 0;

    public ngOnInit(): void {
        this.classlistManager.add('os-button');
    }
}
