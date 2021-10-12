## Description

Allows displaying an array of items in the grid view.

This component is [Data-Agnostic](https://indepth.dev/posts/1314/agnostic-components-in-angular),
so these fields of the `GridItemComponent` are **important to set up**:

- `labelExpr`: Function which processing your item and returns for component the label text;
- `iconUrlExpr`: Function which processing your item and returns for component the link on the icon;

Supported `Templates` described in `Grid/API` section (documentation website).

**Right now there is no Drag & Drop support.**

```html
<os-grid>
    <os-grid-item
        *ngFor="let file of files"
        [data]="file"
        [iconUrlExpr]="fileIconUrlExpr"
        [labelExpr]="fileLabelExpr">
    </os-grid-item>
</os-grid>
```

```typescript
interface File {
    name: string;
    ext: string;
    iconUrl: string;
}

@Component()
export class MyGridComponent {
    public readonly files: File[] = [
        {
            name: 'My file #1',
            ext: 'png',
            iconUrl: '/path/to/icon.png'
        },
        {
            label: 'My file #2',
            ext: 'exe',
            iconUrl: '/path/to/icon.png'
        }
    ];

    public fileIconUrlExpr(item: MyItem): string {
        return item.iconUrl;
    }

    public fileLabelExpr(item: MyItem): string {
        return `${item.name}.${item.ext}`;
    }
}
```

## Features

- 2 directions of filling grid items (Horizontal, Vertical);
- Size of the grid items (Minimum size is 50px);
- Some grid items might have static coordinates, and other items without
coordinates will be filled flowing around static grid items;

## About calculations

Technically each item is absolute.

If some changes happened, the position for all grid items is recalculating.

You can use property `repaintDelayInMs` to set up `debounce time`
in milliseconds before new recalculations will trigger.
