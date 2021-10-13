import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';
import { CommonCssClassEnum, isNil, OsBaseComponent } from '../../../../core';
import { DropdownValueChangeEvent } from '../../interfaces';

@Component({
    selector: 'os-dropdown-item',
    templateUrl: './dropdown-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownItemComponent<T> extends OsBaseComponent implements OnInit, OnChanges {
    /** Is dropdown item selected? */
    @Input()
    @HostBinding(`class.${CommonCssClassEnum.Selected}`)
    public isSelected: boolean = false;

    /** Is dropdown item disabled? */
    @Input()
    @HostBinding(`class.${CommonCssClassEnum.Disabled}`)
    public isDisabled: boolean = false;

    /** Value of the dropdown item */
    @Input()
    public value: T;

    /** Fires when the dropdown item selected */
    @Output()
    public osSelected: EventEmitter<DropdownValueChangeEvent<T>> = new EventEmitter();

    constructor(
        private readonly hostElementRef: ElementRef<HTMLElement>,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        this.initValueAfterValueChanged(changes);
    }

    public ngOnInit(): void {
        this.classListManager.add('os-dropdown-item');
        this.initElementEventObservers(this.hostElementRef.nativeElement);
        this.initDefaultValueIfAbsent();
    }

    /** @internal */
    public onListItemClick(originalEvent: MouseEvent): void {
        if (!this.isDisabled) {
            this.osSelected.emit({ originalEvent, value: this.value });
        }
    }

    /** Sets state of selection and triggers `change detection` */
    public setSelectedState(state: boolean): void {
        this.isSelected = state;

        this.changeDetector.markForCheck();
    }

    /** Gets the label text of the dropdown item */
    public getLabel(): string {
        return this.hostElementRef.nativeElement.innerText || null;
    }

    private initValueAfterValueChanged(changes: SimpleChanges): void {
        if (this.hostElementRef && (changes?.value?.previousValue !== changes?.value?.currentValue)) {
            if (isNil(changes.value.currentValue)) {
                this.initDefaultValueIfAbsent();
            }
        }
    }

    private initDefaultValueIfAbsent(): void {
        if (isNil(this.value)) {
            this.value = this.getLabel() as any;
        }
    }
}
