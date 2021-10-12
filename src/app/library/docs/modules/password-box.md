## Description

Allows you to get password input from the user.

```html
<os-password-box
    [placeholder]="'Hello World'"
    [(value)]="myValueField">
</os-password-box>
```

## Use as a part of the Form Field

```html
<os-form-field [isStacked]="true">
    <os-label>Password</os-label>

    <os-password-box
        [placeholder]="'Please enter your password'"
        [(ngModel)]="userPassword">
    </os-password-box>
</os-form-field>
```

## Use with **@angular/forms**

`<os-password-box>` is compatible with **@angular/forms** and supports both `FormsModule` and `ReactiveFormsModule`.

## Two-Way Binding properties support

`[(value)]`, `[(ngModel)]` are support two-way binding.
