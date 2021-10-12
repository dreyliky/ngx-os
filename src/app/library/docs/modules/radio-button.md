## Description

Allows to select one option from the group of options.

```html
<os-radio-button
    [label]="'Item #1'"
    [name]="'my-radio-group'"
    [data]="1"
    [(ngModel)]="selectedItem">
</os-radio-button>

<os-radio-button
    [label]="'Item #2'"
    [name]="'my-radio-group'"
    [data]="2"
    [(ngModel)]="selectedItem">
</os-radio-button>
```

## Label

Label must be passed via `label` input parameter and it's optional.

This label is also clickable and toggles the checked state.

## Properties **data** & **isChecked**

`data` is a useful payload that will be emitted via the `osChange`
or `ngModel` events when the radio button state changes;

`isChecked` is a boolean state which you should control manually;

## Use with **@angular/forms**

`<os-radio-button>` is compatible with **@angular/forms** and supports both `FormsModule` and `ReactiveFormsModule`.

## Two way binding properties support

`[(isChecked)]`, `[(ngModel)]` are support two-way binding.

## What about template support or content projection slots?

There is no template support in the radio button. If you want to display
something more than `label` near the radio button, then use the radio button
without the `label` and place it near your element with the content you want.
