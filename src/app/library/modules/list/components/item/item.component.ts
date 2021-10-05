import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    OnInit,
    Output
} from '@angular/core';
import { CommonCssClassEnum, OsBaseComponent } from '../../../../core';

@Component({
    selector: 'os-list-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemComponent<T> extends OsBaseComponent implements OnInit {
    @Input()
    @HostBinding(`class.${CommonCssClassEnum.Selected}`)
    public isSelected: boolean = false;

    @HostBinding(`class.${CommonCssClassEnum.Disabled}`)
    @Input()
    public isDisabled: boolean = false;

    @Input()
    public value: T;

    @Output()
    public osSelected = new EventEmitter<T>();

    constructor(
        private readonly hostElementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.classListManager.add('os-list-item');
        this.initElementEventObservers(this.hostElementRef.nativeElement);
    }

    protected onClick(event: PointerEvent): void {
        if (!this.isDisabled) {
            this.osSelected.emit(this.value);

            super.onClick(event);
        }
    }
}