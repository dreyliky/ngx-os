## Description

Selection allows to select the bunch of "selectable" elements.

```html
<div
    osSelectionZone
    class="my-selection-zone">
    <os-checkbox
        #checkbox
        osSelectionItem
        (osItemSelected)="checkbox.value = true;"
        (osItemDeselected)="checkbox.value = false;">
        My checkbox
    </os-checkbox>
</div>
```
