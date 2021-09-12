import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnInit } from '@angular/core';
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
    @HostBinding('class.os-horizontal-direction')
    public readonly isHorizontalDirection: boolean = false;

    private currentView: GridViewType = 'medium-icons';

    constructor(
        private readonly hostElementRef: ElementRef<HTMLElement>
    ) {
        super();
    }

    public ngOnInit(): void {
        this.classlistManager.add(`os-grid ${this.currentView}`);
        this.initElementEventObservers(this.hostElementRef.nativeElement);
    }
}
