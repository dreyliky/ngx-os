## Description

A checkbox allows you to select (or not) single values.

```html
<os-checkbox
    [data]="{ id: 1, name: 'Hello world' }"
    [(ngModel)]="isMyCheckboxChecked">
    My checkbox
</os-checkbox>
```

## Data

`data` is a useful payload that will be emitted via the `osChange` event when the checkbox state changes;

## Use with **@angular/forms**

`<os-checkbox>` is compatible with **@angular/forms** and supports both `FormsModule` and `ReactiveFormsModule`.
