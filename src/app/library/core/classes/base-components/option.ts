import { Directive, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { ɵCommonCssClassEnum } from '../../enums';
import { ɵOsBaseViewComponent } from './view';

@Directive({})
export abstract class ɵOsBaseOptionComponent<T> extends ɵOsBaseViewComponent {
    /** Data of the option item */
    @Input()
    public set data(data: T) {
        this._data = data;

        this._dataUpdated$.next(data);
    }

    public get data(): T {
        return this._data;
    }

    /** Is option item selected? */
    @Input()
    @HostBinding(`class.${ɵCommonCssClassEnum.Selected}`)
    public isSelected: boolean = false;

    /** Is option item disabled? */
    @Input()
    @HostBinding(`class.${ɵCommonCssClassEnum.Disabled}`)
    public isDisabled: boolean = false;

    protected readonly _dataUpdated$ = new Subject<T>();

    private _data: T;

    /** Fires when the option item selected */
    @Output()
    public readonly abstract osSelected: EventEmitter<unknown>;
}
