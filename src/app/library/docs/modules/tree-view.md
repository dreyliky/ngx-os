## Description

Tree View allows you to work with tree data.

`TreeViewComponent` is data-agnostic component, which means it can work with array of any data.

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

**HTML**

```html
<os-tree-view
    [data]="myNodes"
    [childrenHandler]="myChildrenHandler">
</os-tree-view>
```

**TypeScript**

```typescript
import { TreeViewComponent } from 'ngx-os';

interface TreeNode {
    label: string;
    children?: TreeNode[];
}

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

    public readonly myChildrenHandler = (node: TreeNode): TreeNode[] => node.children;

    public onSomeActionHappened(): void {
        this.treeView.nodesExpansion.expand(this.myNodes[0]);
        this.treeView.nodesSelection.select(this.myNodes[1]);
    }
}
```
