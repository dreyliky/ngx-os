import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Injector,
    Input,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
import { ɵOsBaseOptionComponent } from '../../../../core';
import { MenuBarComponent } from '../menu-bar';

@Component({
    selector: 'os-menu-bar-item',
    template: '<ng-content></ng-content>',
    host: {
        'class': 'os-menu-bar-item'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuBarItemComponent<T = any> extends ɵOsBaseOptionComponent<T> implements OnInit {
    @Input()
    public isHideMenuOnClick = true;

    @Output()
    public readonly osSelected: EventEmitter<T> = new EventEmitter();

    constructor(
        injector: Injector,
        private readonly menuBarComponent: MenuBarComponent
    ) {
        super(injector);
    }

    public ngOnInit(): void {
        this.initClickObserver();
    }

    private initClickObserver(): void {
        this.osClick
            .pipe(
                filter(() => this.isHideMenuOnClick),
                takeUntil(this.viewDestroyed$)
            )
            .subscribe(() => this.menuBarComponent._hideAllMenuBars());
    }
}
