import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GridDirectionEnum, IGridItem } from 'ngx-os';

@Component({
    selector: 'demo-grid-overview',
    templateUrl: './grid-overview.component.html',
    styleUrls: ['./grid-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridOverviewComponent implements OnInit {
    public readonly gridDirectionEnum = GridDirectionEnum;

    public readonly items: IGridItem[] = [];

    public currentGridDirection = GridDirectionEnum.Horizontal;
    public gridSize = 72;

    private readonly defaultItem: IGridItem = {
        label: 'My amazing item to display',
        iconUrl: '/assets/icons/folder-opened.png'
    }

    public ngOnInit(): void {
        this.onAddButtonClick();
        this.onAddButtonClick();
        this.onAddButtonClick();
    }

    public onAddButtonClick(): void {
        this.items.push({
            ...this.defaultItem,
            label: `${this.defaultItem.label} #${this.items.length}`
        });
    }

    public onRemoveButtonClick(): void {
        this.items.pop();
    }
}
