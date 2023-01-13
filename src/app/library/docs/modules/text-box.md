## Description

Allows you to get short text input from the user.

```html
<input
    osInput
    placeholder="Hello World"
    [(ngModel)]="myValueField" />
```

## Use as a part of the Form Field

```html
<os-form-field [isStacked]="true">
    <os-label>Name</os-label>

    <input
        osInput
        placeholder="Please enter your name"
        [(ngModel)]="userName" />
</os-form-field>
```

## Use with **@angular/forms**

`<input osInput />` is compatible with **@angular/forms** and supports both `FormsModule` and `ReactiveFormsModule`.
