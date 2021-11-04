# Module creation Guide of the ngx-os

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
