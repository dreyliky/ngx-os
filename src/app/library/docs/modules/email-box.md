## Description

Allows you to get email input from the user.

```html
<os-email-box
    [placeholder]="'Hello World'"
    [(value)]="myValueField">
</os-email-box>
```

## Use as a part of the Form Field

```html
<os-form-field [isStacked]="true">
    <os-label>Email</os-label>

    <os-email-box
        [placeholder]="'Please enter your email'"
        [(ngModel)]="userEmail">
    </os-email-box>
</os-form-field>
```

## Use with **@angular/forms**

`<os-email-box>` is compatible with **@angular/forms** and supports both `FormsModule` and `ReactiveFormsModule`.

## Two-Way Binding properties support

`[(value)]`, `[(ngModel)]` are support two-way binding.
