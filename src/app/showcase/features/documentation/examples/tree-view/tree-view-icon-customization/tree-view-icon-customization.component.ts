import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Item {
    label: string;
    children?: Item[];
}

@Component({
    selector: 'showcase-tree-view-icon-customization',
    templateUrl: './tree-view-icon-customization.component.html',
    styleUrls: ['./tree-view-icon-customization.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeViewIconCustomizationComponent {
    public readonly nodeType!: Item;
    public readonly data: Item[] = [
        { label: 'Item #1' },
        {
            label: 'Item #2',
            children: [
                { label: 'Child item #1' }
            ]
        }
    ];

    public readonly childrenHandler = (item: Item): Item[] => item.children;
}
