import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { OsBaseComponent } from '@lib-core';
import { GridViewType } from '../../types';

@Component({
    selector: 'os-grid',
    templateUrl: './grid.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridComponent extends OsBaseComponent implements OnInit {
    @Input()
    public set view(view: GridViewType) {
        if (view) {
            this.classlistManager.remove(this.currentView);
            this.classlistManager.add(view);

            this.currentView = view;
        }
    }

    @Input()
    @HostBinding('class.horizontal')
    public readonly isHorizontalDirection: boolean = false;

    private currentView: GridViewType = 'medium-icons';

    public ngOnInit(): void {
        this.classlistManager.add(`os-grid ${this.currentView}`);
    }
}
