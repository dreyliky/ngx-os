import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Host,
    HostBinding,
    Injector,
    Input,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { ɵCommonCssClassEnum, ɵIsNil, ɵOsBaseComponent } from '../../../../core';
import { DropdownValueChangeEvent } from '../../interfaces';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
    selector: 'os-dropdown-item',
    template: '<ng-content></ng-content>',
    host: {
        'class': 'os-dropdown-item os-list-item'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownItemComponent<T = any>
    extends ɵOsBaseComponent
    implements OnInit, AfterViewInit {
    /** Data of the dropdown item */
    @Input()
    public set data(data: T) {
        this._data = data;

        this.initDefaultValueIfAbsent();
    }

    /** Data of the dropdown item */
    public get data(): T {
        return this._data;
    }

    /** Is dropdown item disabled? */
    @Input()
    @HostBinding(`class.${ɵCommonCssClassEnum.Disabled}`)
    public isDisabled: boolean = false;

    /** Fires when the dropdown item selected */
    @Output()
    public osSelected: EventEmitter<DropdownValueChangeEvent<T>> = new EventEmitter();

    /** Is dropdown item selected? */
    @HostBinding(`class.${ɵCommonCssClassEnum.Selected}`)
    public isSelected: boolean = false;

    private _data: T;

    constructor(
        injector: Injector,
        @Host() private readonly dropdown: DropdownComponent<T>,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super(injector);
    }

    public ngOnInit(): void {
        this.initClickObserver();
    }

    public ngAfterViewInit(): void {
        super.ngAfterViewInit();
        this.initDefaultValueIfAbsent();
        queueMicrotask(() => this.initDropdownFormControlValueObserver());
    }

    /** Gets the label text of the dropdown item */
    public getLabel(): string {
        return this.hostRef.nativeElement.innerText || this.data?.toString() || null;
    }

    private initClickObserver(): void {
        this.osClick
            .pipe(
                takeUntil(this.viewDestroyed$),
                tap((event) => event.stopPropagation()),
                filter(() => !this.isDisabled)
            )
            .subscribe((originalEvent) => {
                const event: DropdownValueChangeEvent<T> = { originalEvent, data: this.data };

                this.dropdown._onItemSelect(event, this);
                this.osSelected.emit(event);
            });
    }

    private initDefaultValueIfAbsent(): void {
        if (ɵIsNil(this.data)) {
            this._data = this.getLabel() as any;
        }
    }

    private initDropdownFormControlValueObserver(): void {
        this.dropdown.formControlValue$
            ?.pipe(takeUntil(this.viewDestroyed$))
            .subscribe((dropdownValue) => {
                this.isSelected = (dropdownValue === this.data);

                if (this.isSelected) {
                    this.dropdown._initSelectedItem(this);
                }

                this.changeDetector.markForCheck();
            });
    }
}
