# Get started work with ngx-os as Contributor

## How to run project?

- Fork;
- Clone;
- `npm install`;
- `npm run doc`;
- `npm run start`;
- Open `http://localhost:4200`;

## Recommended Development Environment

### Editor

Visual Studio Code;

### VS Code extensions

- Angular Language Service;
- ESLint;
- TODO Highlight;
- Material Icon Theme;

## How to update documentation after code changes?

To update documentation, you should run `npm run doc`.

This command will run `compodoc` library which will scan library and examples code
and create JSON files of the documentation in the `assets` folder.

After that, the `showcase` app will request these files and dynamically build the documentation.

## How to create themes?

Check [Theme Creation Guide](https://github.com/dreyliky/ngx-os/blob/master/src/docs/contributor/theme-creation-guide.md)
to get more information.

## How to create new module/component?

Check [Module Creation Guide](https://github.com/dreyliky/ngx-os/blob/master/src/docs/contributor/module-creation-guide.md)
to get more information.

**Thanks!**
