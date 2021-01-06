import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OsBaseComponent } from 'os-angular/core';

@Component({
    selector: 'os-scroll-view',
    templateUrl: './scroll-view.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'class': 'os-element os-scroll-view',
        '[class]': 'styleClass',
        '[style.overflow-x]': `(horizontalScrollEnabled) ? 'auto' : 'hidden'`,
        '[style.overflow-y]': `(verticalScrollEnabled) ? 'auto' : 'hidden'`,
        '[id]': 'id',
        '[style]': 'style'
    }
})
export class ScrollViewComponent extends OsBaseComponent {

    @Input()
    public verticalScrollEnabled: boolean = true;

    @Input()
    public horizontalScrollEnabled: boolean = false;

    constructor() {
        super();
    }

}
