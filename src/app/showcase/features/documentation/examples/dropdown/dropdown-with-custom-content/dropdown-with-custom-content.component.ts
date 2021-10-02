import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'showcase-dropdown-with-custom-content',
    templateUrl: './dropdown-with-custom-content.component.html',
    styleUrls: ['./dropdown-with-custom-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownWithCustomContentComponent {}
