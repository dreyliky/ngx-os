import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostListener,
    Input,
    OnInit,
    Output
} from '@angular/core';
import { OsBaseComponent } from '@core';
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

        this.hostClasslistManager.applyAsFlag(this.selectedStateClassName, this._selected);
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

    @HostListener('click', ['$event'])
    public onListItemClick(event: MouseEvent): void {
        this.osClick.emit(event);
        this.osSelected.emit({ event, value: this.value });
    }

    public ngOnInit(): void {
        this.hostClasslistManager.add('os-option');
    }
}
