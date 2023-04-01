## Description

Context Menu is a component that you can attach to any ng-template to display a context menu.

The menu appears on right click. On a touch device, a long press opens the context menu.

```html
<div
    [osContextMenu]="myContextMenuTemplate"
    class="container">
    <os-text>
        Right-click here to call ContextMenu
    </os-text>
</div>

<ng-template #myContextMenuTemplate>
    Your custom content here

    <os-context-menu-item>Context-Menu button (item) example</os-context-menu-item>
</ng-template>
```
