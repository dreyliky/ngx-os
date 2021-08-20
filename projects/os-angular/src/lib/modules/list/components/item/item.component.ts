import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostListener,
    Input,
    OnInit,
    Output
} from '@angular/core';
import { OsBaseComponent } from '@lib-core';

@Component({
    selector: 'os-list-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemComponent<T> extends OsBaseComponent implements OnInit {
    @Input()
    public set selected(selected: boolean) {
        this._selected = selected;

        this.hostClasslistManager.applyAsFlag('selected', selected);
    }

    public get selected(): boolean {
        return this._selected;
    }

    @Input()
    public value: T;

    @Output()
    public osSelected = new EventEmitter<T>();

    private _selected = false;

    public ngOnInit(): void {
        this.hostClasslistManager.add('os-list-item');
    }

    @HostListener('click', ['$event'])
    public onListItemClick(event: MouseEvent): void {
        this.osClick.emit(event);
        this.osSelected.emit(this.value);
    }
}
