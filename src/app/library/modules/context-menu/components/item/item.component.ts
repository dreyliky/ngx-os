import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostListener,
    Input,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { ɵOsBaseOptionComponent } from '../../../../core';
import { ContextMenuDirective } from '../../directives';

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
    @Input()
    public isContextMenuCloseOnClick: boolean = true;

    /** Fires when the list item selected */
    @Output()
    public readonly osSelected: EventEmitter<T> = new EventEmitter();

    constructor(
        private readonly contextMenu: ContextMenuDirective
    ) {
        super();
    }

    @HostListener('click')
    protected _onClick(): void {
        if (this.isDisabled) {
            return;
        }

        if (this.isContextMenuCloseOnClick) {
            this.contextMenu.close();
        }

        this.osSelected.emit(this.data);
    }
}
