# Code Style Guide of the ngx-os

- Max length of the methods - 20 lines (except comments);
- Max length of the file - 400 lines (except comments);
- Max length of the line - 100 chars (except comments);
- Explicitly define types for **public** fields in the **library project** (compodoc need this info);
- Explicitly define all access modifiers;
- Explicitly define methods return type;
- Methods should do only one task, which is indicated in their name (except handlers with prefix `on`);
- Don't leave empty methods;
- Don't use an absolute path to import dependencies from the same root folder;
- Don't write the logic in the HTML template;
- Don't write SCSS code in components of the library (You should write SCSS in library/themes folder);

Please check ESLINT rules and stick to them.

**Thanks!**
