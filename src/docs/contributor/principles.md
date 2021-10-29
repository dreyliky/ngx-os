# About principles of the ngx-os library

### All components must:
- Have their own tag selectors started with `os`;
- Have their own CSS class and themes use it to apply styles;
- Have `ChangeDetection.OnPush`;
- Have Outputs with prefix `os`;
- Call `ChangeDetection` as little as possible;
- Don't use `HostListener`, use native JS listeners or RXJS `fromEvent` method (to decrease `ChangeDetection` calls);

### Also
- Each public field must have explicit definition of type even it has initial value (`compodoc` parse it);
- Each boolean field must have prefix `is`;
- Each module should have `index.ts` and `public_api.ts` exports;

**Thanks!**
