## Description

Allows you to get number input from the user.

```html
<os-number-box
    [placeholder]="'Hello World'"
    [(ngModel)]="myValueField">
</os-number-box>
```

## Use as a part of the Form Field

```html
<os-form-field [isStacked]="true">
    <os-label>Age</os-label>

    <os-number-box
        [placeholder]="'Please enter your age'"
        [(ngModel)]="userAge">
    </os-number-box>
</os-form-field>
```

## Use with **@angular/forms**

`<os-number-box>` is compatible with **@angular/forms** and supports both `FormsModule` and `ReactiveFormsModule`.
