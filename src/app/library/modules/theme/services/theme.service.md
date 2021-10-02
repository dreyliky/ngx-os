### Description

Allows you to change the theme, but it doesn't save the state into some long-term storage like `LocalStorage` or `SessionStorage`.
For saving theme state, please make your own service wrapper which will save a state with the theme somewhere you need.

Library applies the `win10` theme by default.


### Different styling depending on the current theme

To apply different styles for your component based on a specific theme, you need to use the next syntax:

```scss
:host-context(.win98) {
    // Some styles...
}

:host-context(.winXP) {
    // Some other styles...
}
```

The class, like `win98`, is the theme name.


### How it works?

`:host-context` is the `ShadowDom` feature that allows you to make a block of styles based on some parent context. In our case, we checking is some parent element contains `.win98` class name.

`ThemeService` sets class with current theme name for `<body>` tag, and it gives the possibility to get the context in any place of our Angular app because every component is a child of a body.
