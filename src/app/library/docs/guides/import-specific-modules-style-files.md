# Import specific modules style files

**Optional. Guide contains information on how to better optimize your app size.**

Each theme has its own folder with a list of SCSS files.

You can find the SCSS file name of modules in the `Module/Theming` section (documentation website).

For example in the [window theming](https://ngx-os.io/components/window/theming) section, you can see the styles file name of the window module is `window.scss`.

In this case, to import specifically window styles, you should create your own theme SCSS file, for example:

`src/app/styles/windows10.scss`

```scss
// Important file to import for all themes is `core.scss`
@import "node_modules/ngx-os/themes/win10/core.scss";
// Than you can import only styles you really need
@import "node_modules/ngx-os/themes/win10/window.scss";
// Other specific style files...
```

Check [Available Themes guide](https://ngx-os.io/guides/available-themes)
to understand which themes exist and to see their locations in the package.

Explore the `node_modules/ngx-os/themes` folder to understand more if you need.

Each library module of each theme have its own styles files to keep it in "one style",
even if the module doesn't have styles right now (styles might be added in the future).

**To use your custom SCSS file as a theme you need to add it into your `angular.json` file**

```json
{
  "projects": {
    "YOUR_PROJECT_NAME": {
      "architect": {
        "build": {
          "options": {
            "styles": [
              // In this case, the windows 10 theme will contain only things you import at the example above
              {
                "input": "src/app/styles/windows10.scss",
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

## Import only assets of specific theme you need

In your `angular.json` you need to define path to specific assets you want to use in your project.

```json
{
  "projects": {
    "YOUR_PROJECT_NAME": {
      "architect": {
        "build": {
          "options": {
            "assets": [
              // Copy all win10 theme assets from ngx-os library into your application assets
              {
                "glob": "**/*",
                "input": "node_modules/ngx-os/assets/themes/win10",
                "output": "assets/themes/win10"
              }
            ]
          }
        }
      }
    }
  }
}
```

<p>
    <font color="red">
        <b>If styles don't apply, please make sure you rebuild your app after modifying your angular.json!</b>
    </font>
</p>
