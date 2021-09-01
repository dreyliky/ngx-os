import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRouteEnum } from '@Core/enums';
import { ComponentEnum, ComponentMetaInfoMap } from '@Features/doc';
import { GridView, OptionSelectedEvent } from 'os-angular';

@Component({
    selector: 'demo-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridComponent implements OnInit {
    public gridViews: GridView[] = [
        'medium-icons', 'large-icons', 'extra-large-icons', 'list'
    ];

    public selectedGridView: GridView;

    public components = [...ComponentMetaInfoMap.values()];

    private readonly gridViewStorageKey: string = 'os-comp-list-grid-view';

    constructor(
        private readonly router: Router
    ) {}

    public ngOnInit(): void {
        this.initSelectedGridView();
    }

    public onGridViewChange(event: OptionSelectedEvent<GridView>): void {
        localStorage.setItem(this.gridViewStorageKey, event.value);
    }

    public onOpenSectionButtonClick(componentType: ComponentEnum): void {
        this.router.navigateByUrl(`/${AppRouteEnum.Components}/${componentType}`);
    }

    private initSelectedGridView(): void {
        const view: GridView = <GridView>localStorage
            .getItem(this.gridViewStorageKey) ?? 'medium-icons';

        this.selectedGridView = view;
    }
}
