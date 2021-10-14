## Description

Allows organizing content across different screens, data sets, and other interactions.

```html
<os-tab-group>
    <os-tab [label]="'Tab #1'">
        Content of the tab #1
    </os-tab>

    <os-tab [label]="'Tab #2'">
        Content of the tab #2
    </os-tab>
</os-tab-group>
```

## Tab label customization

You can customize tab label passing the template with it's content.

```html
<os-tab-group>
    <os-tab>
        <ng-template #tabLabel>
            <b>My tab custom label content</b>
        </ng-template>
    </os-tab>
</os-tab-group>
```

## Content lazy loading (when tab activation)

You can create content dynamically by simply wrapping it into the template.

```html
<os-tab-group>
    <os-tab [label]="'My tab'">
        <ng-template #tabContent>
            Dynamic content of the "My tab"
        </ng-template>
    </os-tab>
</os-tab-group>
```

## Two-Way Binding properties support

`[(selectedTabIndex)]` is supports two-way binding.
