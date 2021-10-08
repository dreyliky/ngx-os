# Local CSS Variables

Local CSS variables, it's CSS variables placed in `style` attribute of specific HTML element.

They are useful for theming and contain useful data for the theming.

There are few reasons why local variables exist:
- Helps to write SCSS code without `!important` flags (don't need to override styles which stored in `style` attribute of elements from theme file);
- Helps to write keyframes animations (CSS doesn't support `!important` flag inside keyframes properties. If styles will in `style` attribute of HTML elements, you will not have the ability to write a lot of animations just because local styles will override all that you define in keyframes);
- Helps to calculate CSS properties via `calc` function, using different variables of the HTML element (also very useful for animations);
