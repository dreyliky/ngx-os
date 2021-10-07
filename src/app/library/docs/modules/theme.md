## Description

`ThemeService` and `AccentColorService` allow you to change the theme or accent color, but they don't save the state into some long-term storage like `LocalStorage` or `SessionStorage`.
For saving state, please make your own service wrapper which will save a state somewhere you need.

## How to apply theme?

In [Get Started](https://github.com/dreyliky/ngx-os/blob/master/src/app/library/docs/guides/get-started.md) guide described how to setup `angular.json` with `scss` theme files and how to apply them from your Angular app.

## How to change value for some accent color?

You need to inject `AccentColorService` to change accent color:

```typescript
@Component()
export class AppComponent implements OnInit {
    constructor(
        private readonly accentColorService: AccentColorService
    ) {}

    public ngOnInit(): void {
        this.accentColorService.apply('primary', { r: 100, g: 100, b: 100 });
    }
}
```

## Different styling depending on the current theme

To apply different styles for your component based on a specific theme, you need to use the next syntax:

```scss
:host-context(.win98) {
    // Some styles for element when win98 theme applied
}

:host-context(.winXP) {
    // Some styles for element when winXP theme applied
}
```

The CSS class like `win98`, is the theme name taken from your `angular.json`.

Check [Get Started](https://github.com/dreyliky/ngx-os/blob/master/src/app/library/docs/guides/get-started.md) guide for more information.


### How it works?

`:host-context` is the `ShadowDom` feature that allows you to make a block of styles based on some parent context. In our case, we checking is some parent element contains `.win98` class name.

`ThemeService` sets class with current theme name for `<body>` tag, and it gives the possibility to get the context in any place of our Angular app because every component is a child of a body.

## Which accent color CSS variables I can use from themes?

Please check `ThemeColorType` in `Theme/API` section (documentation website) to see all available variables.

## Which format of value for each CSS accent color?

Each CSS variable contains value in `RGB` format. Example: `255, 255, 255`.

## How to use CSS variables from themes for styling my components?

Use native CSS syntax to get value from each color type:

```scss
.my-element {
    color: rgb(var(--os-primary-color));
    background-color: rgba(var(--os-background-color), 0.8);
}
```

In this case, library's color-type variable name consists from next parts:

`os`-`COLOR_TYPE`-`color`.

`os` and `color` are hardcode parts of CSS color.

`COLOR_TYPE` it's specific color type from `ThemeColorType` (see `Theme/API` section).
