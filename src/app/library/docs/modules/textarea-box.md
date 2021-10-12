## Description

Allows you to get text input from the user.

```html
<os-textarea-box
    [placeholder]="'Hello World'"
    [(value)]="myValueField">
</os-textarea-box>
```

## Use as a part of the Form Field

```html
<os-form-field [isStacked]="true">
    <os-label>BIO</os-label>

    <os-textarea-box
        [placeholder]="'Please enter your BIO'"
        [(ngModel)]="userBio">
    </os-textarea-box>
</os-form-field>
```

## Use with **@angular/forms**

`<os-textarea-box>` is compatible with **@angular/forms** and supports both `FormsModule` and `ReactiveFormsModule`.

## Two-Way Binding properties support

`[(value)]`, `[(ngModel)]` are support two-way binding.
