import {
    ChangeDetectionStrategy,
    Component,
    Injector,
    Input,
    ViewEncapsulation
} from '@angular/core';
import { ɵOsBaseComponent } from '../../../../core';

@Component({
    selector: 'os-group-box',
    templateUrl: './group-box.component.html',
    host: {
        'class': 'os-group-box'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupBoxComponent extends ɵOsBaseComponent {
    /** Label of group */
    @Input()
    public label: string;

    constructor(
        injector: Injector
    ) {
        super(injector);
    }
}
