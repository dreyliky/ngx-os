## Module styles source file

`resizers.scss`

Check [import specific modules style files guide](https://ngx-os.io/guides/import-specific-modules-style-files)
to get more information.

## ResizableDirective

### CSS Classes

Applies for `resizable element`. Resizable element MIGHT BE child of element[osResizable].

| Name            | Description                       |
| --------------- | --------------------------------- |
| `.os-resizable` | Resizable element                 |
| `.os-resizing`  | Is element resizing right now?    |

### CSS Selectors of children elements

| Name                            | Description                                                                 |
| ------------------------------- | --------------------------------------------------------------------------- |
| `os-resizers`                   | `<os-resizers>` The wrapper of all resizers elements                        |
| `os-resizer`                    | `<os-resizer>` The element by which the resizable element is resizing       |

## `<os-resizers>`

### CSS Classes

| Name            | Description                       |
| --------------- | --------------------------------- |
| `.os-active`    | Exists if resizing enabled        |

## `<os-resizer>`

### CSS Classes

Only one of the CSS classes below might be at once.

| Name            | Description                       |
| --------------- | --------------------------------- |
| `.top`          | Resizer of top side               |
| `.left`         | Resizer of left side              |
| `.right`        | Resizer of right side             |
| `.bottom`       | Resizer of bottom side            |
| `.top-left`     | Resizer of top-left corner        |
| `.top-right`    | Resizer of top-right corner       |
| `.bottom-left`  | Resizer of bottom-left corner     |
| `.bottom-right` | Resizer of bottom-right corner    |
