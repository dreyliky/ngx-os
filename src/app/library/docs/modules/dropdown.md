## Description

Allows to select one of the items from overlay.

Supported `Content Projection Slots` described in `Dropdown/API` section (documentation website).

```html
<os-dropdown-box [(ngModel)]="selectedItem">
    <os-dropdown-item [data]="1">Item #1</os-dropdown-item>
    <os-dropdown-item [data]="2">Item #2</os-dropdown-item>
</os-dropdown-box>
```

## Use with **@angular/forms**

`<os-dropdown-box>` is compatible with **@angular/forms** and supports both `FormsModule` and `ReactiveFormsModule`.

## Two way binding properties support

`[(value)]`, `[(ngModel)]` are support two-way binding.
