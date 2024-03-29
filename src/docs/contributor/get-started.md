# Get started work with ngx-os as Contributor

## How to run project?

- Fork;
- Clone;
- `npm install`;
- `npm run doc`;
- `npm run start`;
- Open `http://localhost:4200`;

## How to build the library?

- `npm run build-lib`;
- Open `dist/ngx-os` folder;

## How to build the showcase?

- `npm run doc`;
- `npm run build`;
- Open `dist/ngx-os-showcase` folder;

## Recommended Development Environment

### Editor

Visual Studio Code;

### VS Code extensions

- Angular Language Service;
- Code Spell Checker;
- ESLint;
- TODO Highlight;
- Material Icon Theme;

## How to update documentation after code changes?

To update documentation, you should run `npm run doc`.

This command will run `compodoc` library which will scan library and examples code
and create JSON files of the documentation in the `assets` folder.

After that, the `showcase` app will request these files and dynamically build the documentation.

## Guides

Please check [Contributor Guides](https://github.com/dreyliky/ngx-os/blob/master/src/docs/contributor)
to get more information.

**Thanks!**
