## Description

Allows you to get **short text** input from the user.

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
        [formControl]="userNameControl" />
</os-form-field>
```

## Textarea

Allows you to get **text** input from the user.

```html
<textarea
    osInput
    placeholder="Hello World'"
    [(ngModel)]="myValueField">
</textarea>
```

## InputNumber

Allows you to get **number** input from the user.

### Features
- Supports Integer or Decimals;
- Supports Min and Max values;
- Supports Min and Max fraction digits count;
- Allows forbidding empty field when no value;

```html
<os-input-number [formControl]="ageControl">
    <input osInput placeholder="Enter your age" />
</os-input-number>
```

## Use with **@angular/forms**

`<input osInput />`, `<textarea osInput>...</textarea>` and `<os-input-number>...</os-input-number>`
are compatible with **@angular/forms** and supports both `FormsModule` and `ReactiveFormsModule`.
