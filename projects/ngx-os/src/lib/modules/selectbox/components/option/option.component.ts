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
import { OsBaseComponent } from '@lib-core';
import { isNil } from '@lib-helpers';
import { SelectboxValueChangeEvent } from '../../interfaces';

@Component({
    selector: 'os-option',
    templateUrl: './option.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionComponent<T> extends OsBaseComponent implements OnInit, OnChanges {
    @Input()
    @HostBinding('class.os-selected')
    public isSelected: boolean = false;

    @Input()
    @HostBinding('class.os-disabled')
    public isDisabled: boolean = false;

    @Input()
    public value: T;

    @Output()
    public osSelected: EventEmitter<SelectboxValueChangeEvent<T>> = new EventEmitter();

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
        this.classlistManager.add('os-option');
        this.initElementEventObservers(this.hostElementRef.nativeElement);
        this.initDefaultValueIfAbsent();
    }

    public onListItemClick(originalEvent: MouseEvent): void {
        if (!this.isDisabled) {
            this.osSelected.emit({ originalEvent, value: this.value });
        }
    }

    public setSelectedState(state: boolean): void {
        this.isSelected = state;

        this.changeDetector.markForCheck();
    }

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
