## TreeViewComponent

### CSS Classes
| Name                            | Description                                         |
| ------------------------------- | --------------------------------------------------- |
| `os-tree-view`                  | Tree View class                                     |

## TreeNode (DIV ELEMENT)

### Local CSS Variables

Check [Local CSS Variables](https://github.com/dreyliky/ngx-os/blob/master/src/app/library/docs/guides/local-css-variables.md) guide to get more information.

| Name                            | Description                                                             |
| ------------------------------- | ----------------------------------------------------------------------- |
| `--os-tree-node-depth`          | Depth of the node. 0 - root node; 1 and more - child node;              |

### CSS Classes

| Name                            | Description                                         |
| ------------------------------- | --------------------------------------------------- |
| `os-tree-node`                  | Tree Node class                                     |
| `os-root-node`                  | Is root? (exists when node depth=0)                 |
| `os-disabled`                   | Is disabled?                                        |
| `os-expandable`                 | Is might be expanded? (exists when has children)    |
| `os-flat`                       | Is doesn't have children?                           |
| `os-expanded`                   | Is expanded right now?                              |
| `os-selected`                   | Is selected right now?                              |

### CSS Classes of children elements

| Name                            | Description                                                                 |
| ------------------------------- | --------------------------------------------------------------------------- |
| `os-icon`                       | `<div>` Expansion icon of the node                                          |
| `os-label`                      | `<div>` Label of the node (might be absent when the custom template passed) |
