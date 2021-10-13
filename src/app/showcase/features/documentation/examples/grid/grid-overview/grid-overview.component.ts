import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GridDirectionEnum } from 'ngx-os';

interface MyGridItem {
    label: string;
    iconUrl: string;
}

@Component({
    selector: 'showcase-grid-overview',
    templateUrl: './grid-overview.component.html',
    styleUrls: ['./grid-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridOverviewComponent implements OnInit {
    public readonly gridDirectionEnum = GridDirectionEnum;

    public readonly items: MyGridItem[] = [];

    public currentGridDirection = GridDirectionEnum.Horizontal;
    public gridSize = 72;

    private readonly defaultItem: MyGridItem = {
        label: 'My amazing item to display',
        iconUrl: '/assets/showcase/icons/folder-opened.png'
    }

    public ngOnInit(): void {
        this.onAddButtonClick();
        this.onAddButtonClick();
        this.onAddButtonClick();
    }

    public itemIconUrlExpr(item: MyGridItem): string {
        return item.iconUrl;
    }

    public itemLabelExpr(item: MyGridItem): string {
        return item.label;
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
