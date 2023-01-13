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
    selector: 'os-context-menu-item',
    template: '<ng-content></ng-content>',
    host: {
        'class': 'os-context-menu-item'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContextMenuItemComponent<T = any> extends ɵOsBaseOptionComponent<T> {
    /** Fires when the list item selected */
    @Output()
    public readonly osSelected: EventEmitter<T> = new EventEmitter();

    /** @internal */
    @HostListener('click')
    public _onClick(): void {
        if (!this.isDisabled) {
            this.osSelected.emit(this.data);
        }
    }
}
