# Theme Creation Guide of the ngx-os

## How to create a new theme?

If you want to create new theme and share it with others, you need:

- Go to `src/app/library/themes` and create new folder in there;
- Create SCSS files with styles for each component like in existing themes;
- Add this theme into `angular.json` with short `bundleName` like in `Get Started Guide`;
- Go to `src/app/showcase/features/theme/enums/theme.enum.ts` and add new key with value of `bundleName` from `angular.json`;
- Go to `src/app/showcase/features/theme/data/theme.array.ts` and add new object with theme metadata;

Now, you can see and apply your theme via the dropdown at the header in the `showcase` app.

## How to create a new theme in a third-party project which uses ngx-os?

- Make some SCSS file with styles for all or specific ngx-os components;
- Add this file into your `angular.json` with short `bundleName` like in `Get Started Guide`;
- Inject `ThemeService` and call `themeService.apply(BUNDLE_NAME)` (where `BUNDLE_NAME` - your `bundleName` from your `angular.json`);

## Assets

All assets you need like icons, fonts you should store at `src/assets/themes`.

## Advices

- Main file of the theme `index.scss`;
- Import `core/index.scss` file into your theme;
- Create all other SCSS files with names like in other themes (The end-user can import only specific modules);
- As for the icons, I recommend using PNG images because they are more optimized than SVG and it's easier to work with bitmaps.
Also icons from "one group" I recommend to join into sprite sheet (because in this case, we have fewer files and the client loads all
states at ones even some sprites don't in use at the start of the app);
- I recommend to use class selectors to apply styles for components;
- All resources should be at local folder of the theme. Don't use links to other external websites;

**Thanks!**
