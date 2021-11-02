## Module styles source file

`tab-group.scss`

Check [import specific modules style files guide](https://github.com/dreyliky/ngx-os/blob/master/src/app/library/docs/guides/import-specific-modules-style-files.md)
to get more information.

## TabGroupComponent

### CSS Classes
| Name              | Description                       |
| ----------------- | --------------------------------- |
| `.os-tab-group`   | Host element                      |

### CSS Selectors of children elements
| Name                | Description                        |
| ------------------- | ---------------------------------- |
| `section`           | `<section>` Native section element |
| `menu`              | `<menu>` Native menu element       |

## TabComponent

### CSS Classes
| Name              | Description                       |
| ----------------- | --------------------------------- |
| `.os-tab`         | Host element                      |

### CSS Selectors of children elements
| Name                | Description                        |
| ------------------- | ---------------------------------- |
| `.os-button`        | `<button>` Native button element   |
| `article`           | `<article>` Native article element |

## `<button .os-button>`

### CSS Classes
| Name              | Description                       |
| ----------------- | --------------------------------- |
| `.os-disabled`    | Is disabled?                      |

### Attributes
| Name                           | Description                               |
| ------------------------------ | ----------------------------------------- |
| `role="tab"`                   | Metadata of role of the button (tab)      |
| `aria-selected="true;false"` | Metadata of selection state of the button |

## `<article>`

### Attributes
| Name                           | Description                                |
| ------------------------------ | ------------------------------------------ |
| `role="tabpanel"`              | Metadata of role of the article (tabpanel) |
