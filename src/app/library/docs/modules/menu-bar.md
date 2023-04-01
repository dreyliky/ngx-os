## Description

A menu bar is a thin, horizontal bar containing the labels of menus in a GUI.

The menu bar provides the user with a place in a window to find program's essential functions.

```html
<os-window>
    <os-menu-bar>
        <button os-menu-bar-button [osMenuBar]="editMenuBarTemplate">Edit</button>
    </os-menu-bar>
</os-window>

<ng-template #editMenuBarTemplate>
    <os-menu-bar-item>Undo</os-menu-bar-item>
    <os-menu-bar-item>Redo</os-menu-bar-item>
</ng-template>
```
