# About Documentation Maintenance

API documentation is parsing via [compodoc](https://compodoc.app) library into JSON files,
from which the `showcase` project is take the information and builds a UI.

There are two different JSON documentations exists:
1. lib-doc (JSON with parsed things from library);
2. showcase-doc (JSON with parsed things from `showcase/features/documentation/examples`)
with examples of library usage;

## Rules about documentation

1. Each public(*) function, method, the property must be covered by the `TSDoc` comment;
2. Each Angular component with `ng-template` support must have `TSDoc` comment above `@Component`
decorator with information of it's usage;
3. Each Angular component with `content projection slots` (ng-content with "select")
support must have `TSDoc` comment above `@Component` decorator with information of it's usage;
4. Each Angular module which components have specific `CSS classes, attributes, child element selectors`
must have `.md` file(**) in `library/docs/theming` documentation folder with a list of supported
things that might be used for new theme creation;
5. Each Angular module must have `.md` file(**) with common documentation placed in `library/docs/modules`;

### Explanations:

1. `public(*)`: Means public things for the end-user of the library.
Your public field might be internal and can be undocumented.
Recommended to mark your internal things using `/** @internal */` comment.
2. `file(**)`: Documentation `.md` file name must have the same name as in `OsComponentEnum`,
because the information from the file will be quered automatically on the documentation website;

## About TSDoc markers for compodoc library

Check [compodoc website](https://compodoc.app/guides/jsdoc-tags.html) to see full information.

- `/** @internal */`: compodoc doesn't include thing covered by this comment in JSON file.
This marker is recommended to use because JSON will not have excess things in production and it's
will make the website loading a little bit faster.

## Recommend to use markers to exclude some things from documentation, but...

`showcase` project also has it's logic of processing JSON data.

It means, some fields, methods, and something else might be excluded on the UI side by its internal logic.

**Thanks!**
