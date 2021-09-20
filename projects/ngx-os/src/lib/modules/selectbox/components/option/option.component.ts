import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    OnInit,
    Output
} from '@angular/core';
import { OsBaseComponent } from '@lib-core';
import { SelectboxValueChangeEvent } from '../../interfaces';

@Component({
    selector: 'os-option',
    templateUrl: './option.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionComponent<T> extends OsBaseComponent implements OnInit {
    @Input()
    @HostBinding('class.os-selected')
    public isSelected: boolean = false;

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

    public ngOnInit(): void {
        this.classlistManager.add('os-option');
        this.initElementEventObservers(this.hostElementRef.nativeElement);
        this.initDefaultValueIfAbsent();
    }

    public setSelectedState(state: boolean): void {
        this.isSelected = state;

        this.changeDetector.markForCheck();
    }

    public onListItemClick(originalEvent: MouseEvent): void {
        this.osSelected.emit({ originalEvent, value: this.value });
    }

    private initDefaultValueIfAbsent(): void {
        if (this.value === undefined || this.value === null) {
            this.value = this.hostElementRef.nativeElement.innerText as any;
        }
    }
}
