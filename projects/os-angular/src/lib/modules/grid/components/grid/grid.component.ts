import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { OsBaseComponent } from 'os-angular/core';
import { GridView } from '../../types/grid-view.type';

@Component({
    selector: 'os-grid',
    templateUrl: './grid.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridComponent extends OsBaseComponent implements OnInit {
    @Input()
    public set view(view: GridView) {
        this.hostClasslistManager.remove(this.currentView);
        this.hostClasslistManager.add(view);

        this.currentView = view;
    }

    private currentView: GridView = 'medium-icons';

    public ngOnInit(): void {
        this.hostClasslistManager.add(`os-grid ${this.currentView}`);
    }
}
