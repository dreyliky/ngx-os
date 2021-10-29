# Theme Creation Guide of the ngx-os

- Main file of the theme `index.scss`;
- Import `core/index.scss` file into your theme;
- Create all other SCSS files with names like in other themes (The end-user can import only specific modules);
- As for the icons, I recommend using PNG images because they are more optimized than SVG and it's easier to work with bitmaps.
Also icons from "one group" I recommend to join into sprite sheet (because in this case, we have fewer files and the client loads all
states at ones even some sprites don't in use at the start of the app);
- I recommend to use class selectors to apply styles for components;
- All resources should be at local folder of the theme. Don't use links to other external websites;

**Thanks!**
