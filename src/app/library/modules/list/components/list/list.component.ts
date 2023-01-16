import {
    ChangeDetectionStrategy,
    Component,
    Input,
    ViewEncapsulation
} from '@angular/core';
import { ɵOsBaseViewComponent } from '../../../../core';

@Component({
    selector: 'os-list',
    templateUrl: './list.component.html',
    host: {
        'class': 'os-list'
    },
    exportAs: 'osList',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent extends ɵOsBaseViewComponent {
    /** Stylelist for scroll view component of the list */
    @Input()
    public scrollViewStyle: object;

    /** Classlist for scroll view component of the list */
    @Input()
    public scrollViewStyleClass: string;
}
