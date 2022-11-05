import {
    ChangeDetectionStrategy,
    Component,
    Input,
    ViewEncapsulation
} from '@angular/core';
import { ɵOsBaseComponent } from '../../../../core';

@Component({
    selector: 'os-list',
    templateUrl: './list.component.html',
    host: {
        'class': 'os-list'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent extends ɵOsBaseComponent {
    /** Stylelist for scroll view component of the list */
    @Input()
    public scrollViewStyle: object;

    /** Classlist for scroll view component of the list */
    @Input()
    public scrollViewStyleClass: string;
}
