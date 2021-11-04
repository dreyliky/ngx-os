# Getting started with ngx-os

## `npm install ngx-os --save`
## Import the modules you need

**Import everything at once**

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

**`OR` Import specific modules**

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

## Setup styling

**Add all styles at once**

Check [Available Themes guide](https://ngx-os.io/guides/available-themes)
to understand which themes exist and to see their locations in the package.

In your `angular.json` you need to define path to themes you want to use in your project.
You can check list of all available themes in `Theme` section.

```json
{
  "projects": {
    "YOUR_PROJECT_NAME": {
      "architect": {
        "build": {
          "options": {
            "assets": [
              // Copy all assets from ngx-os library into your application assets
              {
                "glob": "**/*",
                "input": "node_modules/ngx-os/assets",
                "output": "assets"
              }
            ],
            "styles": [
              // Add themes you need into your app
              {
                "input": "node_modules/ngx-os/themes/win10/index.scss",
                "bundleName": "win10",
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

You can apply theme via `ThemeService`, using this `bundleName`.

**How to import only styles of specific modules?**

Check [Import specific modules style files guide](https://ngx-os.io/guides/import-specific-modules-style-files)
to get more information.

## Apply theme

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

        // To get the currently applied theme `bundleName`, call this:
        const appliedTheme = this.themeService.applied;
        const appliedTheme$ = this.themeService.applied$;
    }
}
```

Now, let's try to display some component:

In your `app.component.html`:
```html
<os-button>Hello world!</os-button>
```

<p>
    <font color="red">
        <b>If styles don't apply, please make sure you rebuild your app after modifying your angular.json!</b>
    </font>
</p>

**Now you're ready to start. Good luck!**
