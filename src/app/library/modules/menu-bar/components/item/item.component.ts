import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { filter } from 'rxjs/operators';
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
export class MenuBarItemComponent<T = any> extends ɵOsBaseOptionComponent<T> implements OnInit {
    @Output()
    public readonly osSelected: EventEmitter<T> = new EventEmitter();

    public ngOnInit(): void {
        this.initClickObserver();
    }

    private initClickObserver(): void {
        this.osClick
            .pipe(
                filter(() => !this.isDisabled)
            )
            .subscribe(() => this.osSelected.emit(this.data));
    }
}
