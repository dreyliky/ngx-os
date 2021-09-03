import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output
} from '@angular/core';
import { OsBaseComponent } from '@lib-core';
import { OptionSelectedEvent } from '../../interfaces';

// FIXME: Refactoring (exist os-list-item)
@Component({
    selector: 'os-option',
    templateUrl: './option.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionComponent<T> extends OsBaseComponent implements OnInit {
    @Input()
    public set selected(value: boolean) {
        this._selected = value;

        this.classlistManager.applyOneAsFlag(this.selectedStateClassName, this._selected);
    }

    public get selected(): boolean {
        return this._selected;
    }

    @Input()
    public value: T;

    @Output()
    public osSelected = new EventEmitter<OptionSelectedEvent<T>>();

    private readonly selectedStateClassName = 'selected';

    private _selected = false;

    constructor(
        private readonly hostElementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.classlistManager.add('os-option');
        this.initElementEventObservers(this.hostElementRef.nativeElement);
    }

    public onListItemClick(event: MouseEvent): void {
        this.osSelected.emit({ event, value: this.value });
    }
}
