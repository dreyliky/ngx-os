## Description

Checkbox component have `<input type="checkbox">` inside.

Here is a simple checkbox usage example:

```html
<os-checkbox
    [label]="'My checkbox'"
    [(isChecked)]="isMyCheckboxChecked"
    [data]="{ id: 1, name: 'Hello world' }">
</os-checkbox>
```

## Checkbox label

Label must be passed via `label` input parameter and it's optional.

This label is also clickable and toggles the checked state.

## Checkbox **data** & **isChecked** are different things

`isChecked` is a boolean state which you should control manually;

`data` is a useful payload that will be emitted via the `osChange` event when the checkbox state changes;

## Use with **@angular/forms**

`<os-checkbox>` is compatible with **@angular/forms** and supports both `FormsModule` and `ReactiveFormsModule`.

## Two way binding properties support

`[(isChecked)]`, `[(ngModel)]` are support two-way binding.

## What about template support or content projection slots?

There is no template support in the checkbox. If you want to display
something more than `label` near the checkbox, then use the checkbox
without the `label` and place it near your element with the content you want.
