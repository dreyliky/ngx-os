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
    selector: 'os-list-item',
    template: '<ng-content></ng-content>',
    host: {
        'class': 'os-list-item'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemComponent<T = any> extends ɵOsBaseOptionComponent<T> {
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
