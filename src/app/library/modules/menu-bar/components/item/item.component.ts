import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostListener,
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

    @HostListener('click')
    public _onClick(): void {
        if (!this.isDisabled) {
            this.osSelected.emit(this.data);
        }
    }
}
