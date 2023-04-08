# About principles of the ngx-os library

### All components must:
- Have their own tag selectors started with `os`;
- Have their own CSS class and themes use it to apply styles;
- Have `ChangeDetection.OnPush`;
- Have Outputs with prefix `os`;
- Call `ChangeDetection` as little as possible;
- Don't use `HostListener`, use native JS listeners or RXJS `fromEvent` method (to control `ChangeDetection` calls).
Exception: You always need to call `ChangeDetection` after your handler called;
- Use `ɵGlobalEvents` service for listening to global events, for example events from `document`;

### Also
- Each public field must have explicit definition of type even it has initial value (`compodoc` parse it);
- Each boolean field must have prefix `is`;
- Each module should have `index.ts` and `public-api.ts` exports;
- Each internal feature of the library (function, class, enum, etc.) must have prefix `ɵ` and doesn't export in `public-api.ts`;

**Thanks!**
