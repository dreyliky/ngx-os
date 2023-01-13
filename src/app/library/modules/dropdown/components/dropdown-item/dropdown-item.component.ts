import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Host,
    HostListener,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ɵIsNil, ɵOsBaseOptionComponent } from '../../../../core';
import { DropdownValueChangeEvent } from '../../interfaces';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
    selector: 'os-dropdown-item',
    template: '<ng-content></ng-content>',
    host: {
        'class': 'os-dropdown-item'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownItemComponent<T = any>
    extends ɵOsBaseOptionComponent<T>
    implements AfterViewInit {
    /** Fires when the dropdown item selected */
    @Output()
    public osSelected: EventEmitter<DropdownValueChangeEvent<T>> = new EventEmitter();

    constructor(
        @Host() private readonly dropdown: DropdownComponent<T>,
        private readonly hostRef: ElementRef<HTMLElement>,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    public ngAfterViewInit(): void {
        this.initDefaultValueIfAbsent();
        queueMicrotask(() => this.initDropdownFormControlValueObserver());
    }

    /** Gets the label text of the dropdown item */
    public getLabel(): string {
        return this.hostRef.nativeElement.innerText || this.data?.toString() || null;
    }

    /** @internal */
    @HostListener('click', ['$event'])
    public _onClick(originalEvent: PointerEvent): void {
        originalEvent.stopPropagation();

        if (!this.isDisabled) {
            const event: DropdownValueChangeEvent<T> = { originalEvent, data: this.data };

            this.dropdown._onItemSelect(event, this);
            this.osSelected.emit(event);
        }
    }

    private initDefaultValueIfAbsent(): void {
        if (ɵIsNil(this.data)) {
            this.data = this.getLabel() as any;
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
