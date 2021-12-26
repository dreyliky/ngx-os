import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostBinding,
    Injector,
    Input,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
import { ɵCommonCssClassEnum, ɵOsBaseComponent } from '../../../../core';

@Component({
    selector: 'os-list-item',
    template: '<ng-content></ng-content>',
    host: {
        'class': 'os-list-item'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemComponent<T = any> extends ɵOsBaseComponent implements OnInit {
    /** Data of the list item */
    @Input()
    public data: T;

    /** Is list item selected? */
    @Input()
    @HostBinding(`class.${ɵCommonCssClassEnum.Selected}`)
    public isSelected: boolean = false;

    /** Is list item disabled? */
    @HostBinding(`class.${ɵCommonCssClassEnum.Disabled}`)
    @Input()
    public isDisabled: boolean = false;

    /** Fires when the list item selected */
    @Output()
    public osSelected = new EventEmitter<T>();

    constructor(
        injector: Injector
    ) {
        super(injector);
    }

    public ngOnInit(): void {
        this.initClickObserver();
    }

    private initClickObserver(): void {
        this.osClick
            .pipe(
                takeUntil(this.viewDestroyed$),
                filter(() => !this.isDisabled)
            )
            .subscribe(() => this.osSelected.emit(this.data));
    }
}
