## Description

Text Box component have native `<input type="text">` element inside.

Here is a simple Text Box usage example:

```html
<os-text-box
    [placeholder]="'Hello World'"
    [(value)]="myValueField">
</os-text-box>
```

## Use as a part of the Form Field

```html
<os-form-field [isStacked]="true">
    <os-label>Name</os-label>

    <os-text-box
        [placeholder]="'Please enter your name'"
        [(ngModel)]="userName">
    </os-text-box>
</os-form-field>
```

## Use with **@angular/forms**

`<os-text-box>` is compatible with **@angular/forms** and supports both `FormsModule` and `ReactiveFormsModule`.

## Two way binding properties support

`[(value)]`, `[(ngModel)]` are support two-way binding.
