import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
import { ɵOsBaseOptionComponent } from '../../../../core';
import { ContextMenuDirective } from '../../directives/context-menu.directive';

@Component({
    selector: 'os-context-menu-item',
    template: '<ng-content></ng-content>',
    host: {
        'class': 'os-context-menu-item'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContextMenuItemComponent<T = any> extends ɵOsBaseOptionComponent<T> implements OnInit {
    @Input()
    public isHideMenuOnClick = true;

    /** Fires when the list item selected */
    @Output()
    public readonly osSelected: EventEmitter<T> = new EventEmitter();

    constructor(
        private readonly contextMenu: ContextMenuDirective
    ) {
        super();
    }

    public ngOnInit(): void {
        this.initClickObserver();
    }

    private initClickObserver(): void {
        this.osClick
            .pipe(
                filter(() => !this.isDisabled),
                takeUntil(this.viewDestroyed$)
            )
            .subscribe(() => {
                this.osSelected.emit(this.data);

                if (this.isHideMenuOnClick) {
                    this.contextMenu.hide();
                }
            });
    }
}
