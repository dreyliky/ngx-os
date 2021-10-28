## Description

Allows to select one option from the group of options.

```html
<os-radio-button
    [name]="'my-radio-group'"
    [data]="1"
    [(ngModel)]="selectedItem">
    Item #1
</os-radio-button>

<os-radio-button
    [name]="'my-radio-group'"
    [data]="2"
    [(ngModel)]="selectedItem">
    Item #2
</os-radio-button>
```

## Properties **data** & **isChecked**

`data` is a useful payload that will be emitted via the `osChange`
or `ngModel` events when the radio button state changes;

`isChecked` is a boolean state which you should control manually;

## Use with **@angular/forms**

`<os-radio-button>` is compatible with **@angular/forms** and supports both `FormsModule` and `ReactiveFormsModule`.

## Two way binding properties support

`[(isChecked)]`, `[(ngModel)]` are support two-way binding.
