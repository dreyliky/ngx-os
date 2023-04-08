import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Item {
    text: string;
    iconUrl: string;
    selected: boolean;
}

@Component({
    selector: 'showcase-list-custom-template',
    templateUrl: './list-custom-template.component.html',
    styleUrls: ['./list-custom-template.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListCustomTemplateComponent {
    public readonly items: Item[] = [
        {
            text: 'My PC',
            iconUrl: '/assets/showcase/icons/my-pc.png',
            selected: false
        },
        {
            text: 'Calculator',
            iconUrl: '/assets/showcase/icons/calculator.png',
            selected: true
        },
        {
            text: 'Notepad',
            iconUrl: '/assets/showcase/icons/notepad.png',
            selected: true
        }
    ];

    public readonly listItemStyles = {
        height: '36px'
    };

    public isAllItemsSelected: boolean;
    public selectedItemsAsString: string;

    public onCheckboxClick(): void {
        this.updateIsAllItemsSelected();
        this.updateSelectedItemsAsString();
    }

    public onOpenButtonClick(item: Item): void {
        alert(`Open: ${item.text}`);
    }

    public onToggleAllCheckboxClick(): void {
        this.items.forEach((item) => item.selected = !this.isAllItemsSelected);
        this.onCheckboxClick();
    }

    private updateIsAllItemsSelected(): void {
        this.isAllItemsSelected = this.items
            .every((item) => item.selected);
    }

    private updateSelectedItemsAsString(): void {
        this.selectedItemsAsString = this.items
            .filter((item) => item.selected)
            .map((item) => item.text)
            .join(', ');
    }
}
