import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { ɵOsBaseOptionComponent } from '../../../../core';

@Component({
    selector: 'os-menu-bar-item',
    template: '<ng-content></ng-content>',
    host: {
        'class': 'os-menu-bar-item'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuBarItemComponent<T = any> extends ɵOsBaseOptionComponent<T> {
    @Output()
    public readonly osSelected: EventEmitter<T> = new EventEmitter();
}
