import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OsBaseButtonComponent } from '@core';
import { buttonType } from '../../shared';

@Component({
    selector: 'os-button',
    templateUrl: './button.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent extends OsBaseButtonComponent {
    @Input()
    public type: buttonType = 'button';
}
