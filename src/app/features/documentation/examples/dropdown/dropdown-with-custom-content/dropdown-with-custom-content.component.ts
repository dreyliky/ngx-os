import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'demo-dropdown-with-custom-content',
    templateUrl: './dropdown-with-custom-content.component.html',
    styleUrls: ['./dropdown-with-custom-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownWithCustomContentComponent {}
