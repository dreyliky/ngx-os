## Description

Allows you to get number input from the user.

## Features
- Supports Integer or Decimals;
- Supports Min and Max values;
- Supports Min and Max fraction digits count;
- Allows forbidding empty field when no value;

```html
<input
    os-number-box
    placeholder="Hello World"
    [(ngModel)]="myValueField" />
```

## Use as a part of the Form Field

```html
<os-form-field [isStacked]="true">
    <os-label>Age</os-label>

    <input
        os-number-box
        placeholder="Please enter your age"
        [(ngModel)]="userAge" />
</os-form-field>
```

## Use with **@angular/forms**

`<input os-number-box>` is compatible with **@angular/forms** and supports both `FormsModule` and `ReactiveFormsModule`.
