## Description

`DynamicWindowService` allows you to open your components inside OS-style windows.

To open a fully functional OS-style window, you need to write few lines of code:

```typescript
this.dynamicWindowService.open(YOUR_COMPONENT_TO_RENDER_INSIDE);
```

By doing this, you will see an absolute window element created inside the `<body>` element.
Inside this window will be rendered your component.

This window will have features like:
- Hiding, Toggle Fullscreen mode, Closing;
- Resizing from each side and angle;
- Dragging by title bar;
- ScrollView inside of window's body, inside which will be your component;
- The logic of overlapping different windows with each other;
- The logic for determining the active window;

## What if I want to change the default behavior of dynamic windows?

`DynamicWindowSharedConfigService` allows you to manipulate the default setup for all windows.

```typescript
this.dynamicWindowSharedConfigService.update({
    allowedResizers = [],
    iconUrl: '/path/to/my-icon.png',
    hidesInto: { x: '100%', y: '100%' }
});
```

Code above will apply for all your dynamic windows, next settings:

- Forbidding to resize the dynamic window from any side and angle;
- In the title bar will be rendered icon taken from `/path/to/my-icon.png`;
- Each dynamic window will be hiding in the right bottom corner (means the animation of hiding/showing will move the window in/from these coordinates).

### But what if I want to override some setting for a specific window?

You can override some settings passing config while you opening your window (via `DynamicWindowService`):

```typescript
this.dynamicWindowService.open(YOUR_COMPONENT_TO_RENDER_INSIDE, {
    hidesInto: { x: '0%', y: '0%' }
});
```

In this case, your window will be hiding into `top left` corner, while all others - in `bottom right`.

### Okay, but what if I want to change some settings later?

If you want to change config settings later after opening window, you need to do next in your `YOUR_COMPONENT_TO_RENDER_INSIDE`:

```typescript
import { DYNAMIC_WINDOW_REF, IDynamicWindowConfig } from 'ngx-os';

@Component()
export class MyComponentInsideDynamicWindow implements OnInit {
    constructor(
        @Inject(DYNAMIC_WINDOW_REF) private readonly windowRef: IDynamicWindowConfig
    ) {}

    public ngOnInit(): void {
        setTimeout(() => {
            this.windowRef.updateConfig({
                hidesInto: { x: '100%', y: '0%' }
            });
        }, 3000);
    }
}
```

In this case, after 3 seconds after component creation, the dynamic window's config will be updated, after that dynamic window will be hiding in the `top right` corner.

## Can I change the title bar content for the dynamic window?

Yes, you can. To make it real, you need to pass your custom component as `titleBarCustomContent` parameter into the `DynamicWindowConfig`.

Check `Window/Examples` page (documentation website) for more information.
