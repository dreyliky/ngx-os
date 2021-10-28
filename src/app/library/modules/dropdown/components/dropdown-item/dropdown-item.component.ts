import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Host,
    HostBinding,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { CommonCssClassEnum, isNil, OsBaseComponent } from '../../../../core';
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
export class DropdownItemComponent<T>
    extends OsBaseComponent
    implements OnInit, AfterViewInit, OnChanges {
    /** Data of the dropdown item */
    @Input()
    public data: T;

    /** Is dropdown item disabled? */
    @Input()
    @HostBinding(`class.${CommonCssClassEnum.Disabled}`)
    public isDisabled: boolean = false;

    /** Fires when the dropdown item selected */
    @Output()
    public osSelected: EventEmitter<DropdownValueChangeEvent<T>> = new EventEmitter();

    /** Is dropdown item selected? */
    @HostBinding(`class.${CommonCssClassEnum.Selected}`)
    public isSelected: boolean = false;

    constructor(
        @Host() private readonly dropdown: DropdownComponent<T>,
        private readonly hostRef: ElementRef<HTMLElement>,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        this.processValueOnChanges(changes);
    }

    public ngOnInit(): void {
        this.initElementEventObservers(this.hostRef.nativeElement);
    }

    public ngAfterViewInit(): void {
        this.initDefaultValueIfAbsent();
        queueMicrotask(() => this.initDropdownFormControlValueObserver());
    }

    /** Gets the label text of the dropdown item */
    public getLabel(): string {
        return this.hostRef.nativeElement.innerText || this.data?.toString() || null;
    }

    protected onClick(originalEvent: MouseEvent): void {
        super.onClick(originalEvent);
        originalEvent.stopPropagation();

        if (!this.isDisabled) {
            const event: DropdownValueChangeEvent<T> = { originalEvent, data: this.data };

            this.dropdown.onItemSelect(event, this);
            this.osSelected.emit(event);
        }
    }

    private processValueOnChanges(changes: SimpleChanges): void {
        if (this.hostRef && (changes?.value?.previousValue !== changes?.value?.currentValue)) {
            if (isNil(changes.value.currentValue)) {
                this.initDefaultValueIfAbsent();
            }
        }
    }

    private initDefaultValueIfAbsent(): void {
        if (isNil(this.data)) {
            this.data = this.getLabel() as any;
        }
    }

    private initDropdownFormControlValueObserver(): void {
        this.dropdown.formControlValue$
            ?.pipe(takeUntil(this.viewDestroyed$))
            .subscribe((dropdownValue) => {
                this.isSelected = (dropdownValue === this.data);

                if (this.isSelected) {
                    this.dropdown.initSelectedItem(this);
                }

                this.changeDetector.markForCheck();
            });
    }
}
