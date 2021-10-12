## Description

Allows to wrap component and mark it with some text label.

Using the `isStacked` parameter, you can set up will label
above the component or in one row with it.

Might be used as a wrapper for some items of form.

```html
<form [formGroup]="formGroup">
    <os-field-row [isStacked]="false">
        <os-label>Login</os-label>

        <os-text-box
            [placeholder]="'Please enter your login'"
            [formControl]="formGroup.controls.login">
        </os-text-box>
    </os-field-row>

    <os-field-row [isStacked]="false">
        <os-label>Password</os-label>

        <os-password-box
            [placeholder]="'Please enter your password'"
            [formControl]="formGroup.controls.password">
        </os-password-box>
    </os-field-row>

    <os-button
        (osClick)="onLogInButtonClick()">
        Log In
    </os-button>
</form>
```

```typescript
@Component()
export class MyFormComponent {
    public readonly formGroup = new FormGroup({
        login: new FormControl(''),
        password: new FormControl('')
    });

    public onLogInButtonClick(): void {/* LogIn code */}
}
```
