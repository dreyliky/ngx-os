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
import { ɵMenuBarActiveButtonState } from '../../states';

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
    /** Is MenuBar should be closed by clicking menu-bar-item? */
    @Input()
    public isMenuBarCloseOnClick: boolean = true;

    @Output()
    public readonly osSelected: EventEmitter<T> = new EventEmitter();

    constructor(
        private readonly activeButtonState: ɵMenuBarActiveButtonState
    ) {
        super();
    }

    @HostListener('click')
    protected _onClick(): void {
        if (this.isDisabled) {
            return;
        }

        if (this.isMenuBarCloseOnClick) {
            this.activeButtonState.clear();
        }

        this.osSelected.emit(this.data);
    }
}
