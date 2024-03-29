## Description

Allows displaying an array of items in the grid view.

Supported `Templates` described in `Grid/API` section (documentation website).

**Right now there is no Drag & Drop support.**

```html
<os-grid>
    <os-grid-item
        *ngFor="let file of files"
        [iconUrl]="file.iconUrl"
        [label]="file.name">
    </os-grid-item>
</os-grid>
```

```typescript
interface File {
    name: string;
    iconUrl: string;
}

@Component()
export class MyGridComponent {
    public readonly files: File[] = [
        {
            name: 'My file #1',
            iconUrl: '/path/to/icon.png'
        },
        {
            label: 'My file #2',
            iconUrl: '/path/to/icon.png'
        }
    ];
}
```

## Features

- 2 directions of filling grid items (Horizontal, Vertical);
- Size of the grid items (Minimum size is 50px);
- Some grid items might have static coordinates, and other items without
coordinates will be filled flowing around static grid items;

## About grid cells

The amount of cells is calculated based on the `os-grid` element size (width, height).

**Make sure your `os-grid` element has the correct size in all cases to ensure correct determinations of cells amount.**

## About calculations

Technically each item is absolute.

If some changes happened, the position for all grid items is recalculating.

You can use property `repaintDelayInMs` to set up `debounce time`
in milliseconds before new recalculations will trigger.
