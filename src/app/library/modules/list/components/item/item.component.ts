import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { CommonCssClassEnum, OsBaseComponent } from '../../../../core';

@Component({
    selector: 'os-list-item',
    templateUrl: './item.component.html',
    host: {
        'class': 'os-list-item'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemComponent<T> extends OsBaseComponent implements OnInit {
    /** Is list item selected? */
    @Input()
    @HostBinding(`class.${CommonCssClassEnum.Selected}`)
    public isSelected: boolean = false;

    /** Is list item disabled? */
    @HostBinding(`class.${CommonCssClassEnum.Disabled}`)
    @Input()
    public isDisabled: boolean = false;

    /** Value of the list item */
    @Input()
    public value: T;

    /** Fires when the list item selected */
    @Output()
    public osSelected = new EventEmitter<T>();

    constructor(
        private readonly hostElementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.initElementEventObservers(this.hostElementRef.nativeElement);
    }

    protected onClick(event: PointerEvent): void {
        if (!this.isDisabled) {
            this.osSelected.emit(this.value);

            super.onClick(event);
        }
    }
}
