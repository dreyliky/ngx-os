## Description

Tree View allows you to work with tree data.

You need to adapt your data to an array of `TreeNode` objects and pass this array as `data` into `TreeViewComponent`.

If you want to customize your nodes, you can pass the template inside the `<os-tree-view>` component.

Supported `Content Projection Slots` and `Templates` described in `Tree View/API` section (documentation website).

## Features

- Expansion;
- Selection;
- Customizing nodes using templates;
- Customizing tree-view using content projection slots;

## How to select or expand some nodes programmatically?

Please use `TreeViewComponent`'s fields `nodesExpansion` and `nodesSelection` to
manipulate expansion or selection states at the moment when the elements have already been rendered.

```html
<os-tree-view
    [data]="myNodes">
</os-tree-view>
```

```typescript
import { TreeViewComponent } from 'ngx-os';

@Component()
export class AppComponent {
    public readonly myNodes: TreeNode[] = [
        {
            label: 'My Node 1',
            children: [
                { label: 'My Child Node 1' },
                { label: 'My Child Node 2' }
            ]
        },
        { label: 'My Node 2' },
        { label: 'My Node 3' }
    ];

    @ViewChild(TreeViewComponent)
    private readonly treeView: TreeViewComponent;

    public onSomeActionHappend(): void {
        this.treeView.nodesExpansion.expand(this.myNodes[0]);
        this.treeView.nodesSelection.select(this.myNodes[1]);
    }
}
```

## But can I just set value into isExpanded and isSelected fields of node objects?

You can define fields `isExpanded` and `isSelected` of `TreeNode` object to make node selected or expanded,
but recommended using them only as initial state or only to read data from them to understand the actual state of the node at the current moment.

`ChangeDetection.OnPush` is the reason why you should use methods to manipulate states instead of direct assignments of values into those fields.
