# Get started work with ngx-os as Contributor

## How to run project?

- Fork;
- Clone;
- `npm install`;
- `npm run doc`;
- `npm run start`;
- Open `http://localhost:4200`;

## How to update documentation after code changes?

To update documentation, you should run `npm run doc`.

This command will run `compodoc` library which will scan library and examples code
and create JSON files of the documentation in the `assets` folder.

After that, the `showcase` will request these files and dynamically build the documentation.

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

## How to create new module/component?

- Go to `src/app/library/modules` and create new folder in there;
- Inside folder create the `angular module`;
- Export content from the folder via `index.ts` (for the showcase app) and `public_api.ts` (for end-users of the library);
- Go to `src/app/showcase/features/documentation/examples` folder and create new folder with examples components of your module and declare them in the `examples.module.ts`;
- Go to `src/app/showcase/features/documentation/data/components-meta-info` and create new file with metainfo for your module and export it via `index.ts`;
- Go to `src/app/showcase/features/documentation/enums/component.enum.ts` and add new key with name of your module (uses in the `showcase` app at URL as a link to documentation of your module);
- Go to `src/app/showcase/features/documentation/data/component-meta-info.map.ts` file and add both Enum value and MetaInfo object into the map;
- Go to `src/app/library/docs` and add documentation of your module (call file name as your folder name in `modules` folder, and these documentation will be automatically loaded in the `showcase` app);
- Run `npm run doc`;

Now, check the `showcase` app, your module has its own: docs, examples, API overviews!

**Thanks!**
