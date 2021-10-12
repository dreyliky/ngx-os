## Description

Allows displaying array of items in grid view.

You need to adapt your data to an array of `IGridItem`
objects and pass this array as `data` into GridComponent.

**You can't pass your custom template for items.**

**Right now there is no drag and drop support.**

```html
<os-grid>
    <os-grid-item
        *ngFor="let item of items"
        [data]="item">
    </os-grid-item>
</os-grid>
```

```typescript
@Component()
export class MyGridComponent {
    public readonly items: IGridItem[] = [
        {
            label: 'My item #1',
            iconUrl: '/path/to/icon.png'
        },
        {
            label: 'My item #2',
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

## About calculations

Technically each item is absolute.

If some changes happened, the position for all grid items is recalculating.

You can use property `repaintDelayInMs` to set up `debounce time`
in milliseconds before new recalculations will trigger.
