import {
    AfterContentInit,
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
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import { CommonCssClassEnum, isNil, OsBaseComponent } from '../../../../core';
import { DropdownValueChangeEvent } from '../../interfaces';

@Component({
    selector: 'os-dropdown-item',
    template: '<ng-content></ng-content>',
    host: {
        'class': 'os-dropdown-item os-list-item'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownItemComponent<T> extends OsBaseComponent implements OnInit, AfterContentInit, OnChanges {
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
        private readonly changeDetector: ChangeDetectorRef,
        private readonly hostElementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        this.initValueAfterValueChanged(changes);
    }

    public ngOnInit(): void {
        this.initElementEventObservers(this.hostElementRef.nativeElement);
    }

    public ngAfterContentInit(): void {
        this.initDefaultValueIfAbsent();
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

    protected onClick(originalEvent: MouseEvent): void {
        super.onClick(originalEvent);

        if (!this.isDisabled) {
            this.osSelected.emit({ originalEvent, data: this.data });
        }
    }

    private initValueAfterValueChanged(changes: SimpleChanges): void {
        if (this.hostElementRef && (changes?.value?.previousValue !== changes?.value?.currentValue)) {
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
}
