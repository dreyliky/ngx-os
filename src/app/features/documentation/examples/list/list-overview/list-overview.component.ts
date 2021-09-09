import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

interface Item {
    text: string;
}

@Component({
    selector: 'demo-list-overview',
    templateUrl: './list-overview.component.html',
    styleUrls: ['./list-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListOverviewComponent implements OnInit {
    public items: Item[] = [
        { text: 'Item 1' },
        { text: 'Item 2' },
        { text: 'Item 3' }
    ];

    public selectedItem: Item;

    public ngOnInit(): void {
        this.selectedItem = this.items[2];
    }

    public onItemClick(item: Item): void {
        this.selectedItem = item;
    }
}
