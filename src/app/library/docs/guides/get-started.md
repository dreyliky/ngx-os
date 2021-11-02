# Getting started with ngx-os

## Install ngx-os

`npm install ngx-os --save`

## Setup ngx-os

### Import the required modules

**Quick start. Import everything at once:**

In your `app.module.ts`:
```typescript
import { NgxOsModule } from 'ngx-os';

@NgModule({
    imports: [
        NgxOsModule
    ]
})
export class AppModule {}
```

**To import specific modules you need:**

In your `app.module.ts`:
```typescript
import { ButtonModule, DropdownModule, ListModule WindowModule } from 'ngx-os';

@NgModule({
    imports: [
        ButtonModule,
        DropdownModule,
        ListModule
        WindowModule
    ]
})
export class AppModule {}
```

Now, let's try to display some component:

In your `app.component.html`:
```html
<os-button>Hello world!</os-button>
```

You won't see any styles applied at this time. Let's fix it!

### Setup styling

**Quick start. Add everything at once:**

In your `angular.json` you need to define path to themes you want to use in your project.
You can check list of all available themes in `Theme` section.
```json
{
    "projects": {
        "YOUR_PROJECT_NAME": {
            "architect": {
                "build": {
                    "options": {
                        "styles": [
                            {
                                "input": "node_modules/ngx-os/themes/win10/index.scss",
                                "bundleName": "win10",
                                "inject": false
                            },
                            {
                                "input": "node_modules/ngx-os/themes/winXP/index.scss",
                                "bundleName": "win98",
                                "inject": false
                            }
                        ]
                    }
                }
            }
        }
    }
}
```

**Important!** `bundleName` it's output css file name. You can name it how you want.
You can apply theme, using this name.

**What if you only want to include only styles of specific components? Or where you can override some styles?**

In this case, you can define somewhere manually `scss` file.
In this file, you can import exactly the things you need. For example:

In your `src/app/styles/win10.scss`:
```scss
// All component styles
@import "ngx-os/themes/win10/index.scss";

// Important basic things that must be imported
@import "ngx-os/themes/win10/core.scss";

// Specific things you want to use
@import "ngx-os/themes/win10/button.scss";
@import "ngx-os/themes/win10/window.scss";
```

Check [import specific modules style files guide](https://github.com/dreyliky/ngx-os/blob/master/src/app/library/docs/guides/import-specific-modules-style-files.md)
to get more information.

After that, just like in case above, add this file to `angular.json`:

In your `angular.json`:
```json
{
    "styles": [
        {
            "input": "src/app/styles/win10.scss",
            "bundleName": "win10",
            "inject": false
        }
    ]
}
```

### Apply theme

```typescript
import { ThemeService } from 'ngx-os';

@Component({
    // ...
})
export class AppComponent implements OnInit {
    constructor(
        private readonly themeService: ThemeService
    ) {}

    public ngOnInit(): void {
        // Here you need to pass `bundleName` from `angular.json` styles
        this.themeService.apply('win10');
    }
}
```

To get the currently applied theme `bundleName`, you need to call:

```typescript
const appliedTheme = this.themeService.applied;
const appliedTheme$ = this.themeService.applied$;

console.log(appliedTheme, appliedTheme$);
```

Now, you're ready to start. Good luck!
