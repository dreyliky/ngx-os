import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

interface Item {
    text: string;
    isDisabled?: boolean;
}

@Component({
    selector: 'showcase-list-overview',
    templateUrl: './list-overview.component.html',
    styleUrls: ['./list-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListOverviewComponent implements OnInit {
    public items: Item[] = [
        { text: 'Item 1' },
        { text: 'Item 2' },
        { text: 'Item 3 (disabled)', isDisabled: true }
    ];

    public selectedItem: Item;

    public ngOnInit(): void {
        this.selectedItem = this.items[1];
    }

    public onItemSelected(item: Item): void {
        this.selectedItem = item;
    }
}
