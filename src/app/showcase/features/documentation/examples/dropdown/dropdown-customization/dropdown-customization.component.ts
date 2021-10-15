import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentMetaInfoMap } from '../../../data';
import { ComponentMetaInfo } from '../../../interfaces';

@Component({
    selector: 'showcase-dropdown-customization',
    templateUrl: './dropdown-customization.component.html',
    styleUrls: ['./dropdown-customization.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownСustomizationComponent {
    public readonly components: ComponentMetaInfo[] = [...ComponentMetaInfoMap.values()];
}
