import {
    ChangeDetectionStrategy,
    Component,
    Input,
    ViewEncapsulation
} from '@angular/core';
import { ɵOsBaseViewComponent } from '../../../../core';

@Component({
    selector: 'fieldset[os-group-box]',
    templateUrl: './group-box.component.html',
    host: {
        'class': 'os-group-box'
    },
    exportAs: 'osGroupBox',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupBoxComponent extends ɵOsBaseViewComponent {
    /** Label of group */
    @Input()
    public label: string;
}
