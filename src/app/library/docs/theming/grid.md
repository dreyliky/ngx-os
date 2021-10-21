## GridComponent

### Local CSS Variables

Check [Local CSS Variables](https://github.com/dreyliky/ngx-os/blob/master/src/app/library/docs/guides/local-css-variables.md) guide to get more information.

| Name                     | Description                                                                                      |
| ------------------------ | -----------------------------------------------------------------------------------------------  |
| `--os-grid-size`         | Grid size in px                                                                                  |
| `--os-label-height`      | Height of the label below icon (helpful to calculate icon height in default and selected states) |
| `--os-grid-item-padding` | Padding of the `.os-grid-item` (helpful to calculate icon height in default and selected states) |

### CSS Classes
| Name            | Description                       |
| --------------- | --------------------------------- |
| `.os-grid`      | Host element                      |

## GridItemComponent

### CSS Classes
| Name            | Description                       |
| --------------- | --------------------------------- |
| `.os-grid-item` | Host element                      |
| `.os-selected`  | Is selected?                      |

### CSS Selectors of children elements
| Name                | Description                |
| ------------------- | -------------------------  |
| `.os-icon`          | `<div>` Icon element       |
| `.os-label`         | `<span>` Label element     |

## `<div .os-icon>`

### Local CSS Variables

Check [Local CSS Variables](https://github.com/dreyliky/ngx-os/blob/master/src/app/library/docs/guides/local-css-variables.md) guide to get more information.

| Name               | Description                   |
| ------------------ | ----------------------------  |
| `--os-icon-url`    | Url to the icon in CSS format |
