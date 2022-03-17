import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
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
export class ListItemComponent<T = any> extends ɵOsBaseOptionComponent<T> implements OnInit {
    /** Fires when the list item selected */
    @Output()
    public readonly osSelected: EventEmitter<T> = new EventEmitter();

    public ngOnInit(): void {
        this.initClickObserver();
    }

    private initClickObserver(): void {
        this.osClick
            .pipe(
                filter(() => !this.isDisabled),
                takeUntil(this.viewDestroyed$)
            )
            .subscribe(() => this.osSelected.emit(this.data));
    }
}
