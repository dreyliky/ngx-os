## Module styles source file

`dropdown.scss`

Check [import specific modules style files guide](https://ngx-os.io/guides/import-specific-modules-style-files)
to get more information.

## DropdownComponent

### CSS Classes
| Name           | Description                       |
| -------------- | --------------------------------- |
| `.os-dropdown` | Host element                      |
| `.os-disabled` | Is disabled?                      |

### CSS Selectors of children elements
| Name                           | Description                                                             |
| ------------------------------ | ----------------------------------------------------------------------- |
| `.os-placeholder`              | `<span>` Placeholder text                                               |
| `.os-value`                    | `<span>` Selected value text                                            |
| `.os-list.os-part-of-dropdown` | `<os-list>` List with dropdown items (might be inside `<body>` element) |

## DropdownItemComponent

### CSS Classes
| Name                             | Description                       |
| -------------------------------- | --------------------------------- |
| `.os-dropdown-item.os-list-item` | Host element                      |
| `.os-selected`                   | Is selected?                      |
| `.os-disabled`                   | Is disabled?                      |
