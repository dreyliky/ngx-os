import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
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

        this.classlistManager.applyOneAsFlag('selected', selected);
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
        this.classlistManager.add('os-list-item');
    }

    protected onClick(event: PointerEvent): void {
        this.osSelected.emit(this.value);

        super.onClick(event);
    }
}
