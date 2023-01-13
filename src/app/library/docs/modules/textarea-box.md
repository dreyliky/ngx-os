## Description

Allows you to get text input from the user.

```html
<textarea
    osInput
    placeholder="Hello World'"
    [(ngModel)]="myValueField">
</textarea>
```

## Use as a part of the Form Field

```html
<os-form-field [isStacked]="true">
    <os-label>BIO</os-label>

    <textarea
        osInput
        placeholder="Please enter your BIO"
        [(ngModel)]="userBio">
    </textarea>
</os-form-field>
```

## Use with **@angular/forms**

`<textarea osInput>` is compatible with **@angular/forms** and supports both `FormsModule` and `ReactiveFormsModule`.
