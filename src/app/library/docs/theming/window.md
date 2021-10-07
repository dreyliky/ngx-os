## DynamicWindowComponent

Only for window which created via `DynamicWindowService`.

### Local CSS Variables
| Name                            | Description                                                             |
| ------------------------------- | ----------------------------------------------------------------------- |
| `--os-width`                    | Width at the windowed mode in px                                        |
| `--os-height`                   | Height at the windowed mode in px                                       |
| `--os-real-width`               | Actual width of the element in px                                       |
| `--os-real-height`              | Actual height of the element in px                                      |
| `--os-top`                      | Coordinates from the top of the screen in px                            |
| `--os-left`                     | Coordinates from the left of the screen in px                           |
| `--os-coordinate-x-for-hiding`  | Coordinates where you want to hide the window by X-Axis in any CSS unit |
| `--os-coordinate-y-for-hiding`  | Coordinates where you want to hide the window by Y-Axis in any CSS unit |
| `--os-fullscreen-offset-top`    | Offset from the top of the screen in any CSS unit                       |
| `--os-fullscreen-offset-right`  | Offset from the right of the screen in any CSS unit                     |
| `--os-fullscreen-offset-bottom` | Offset from the bottom of the screen in any CSS unit                    |
| `--os-fullscreen-offset-left`   | Offset from the left of the screen in any CSS unit                      |

### CSS Classes
| Name                            | Description                                 |
| ------------------------------- | ------------------------------------------- |
| `os-opening`                    | Is opening right now? (once after creation) |
| `os-hiding`                     | Is hiding right now?                        |
| `os-showing`                    | Is showing right now?                       |
| `os-closing`                    | Is closing right now? (once before closing) |
| `os-entering-fullscreen`        | Is entering fullscreen right now?           |
| `os-entering-windowed`          | Is entering windowed right now?             |
| `os-hidden`                     | Is hidden?                                  |
| `os-fullscreen`                 | Is fullscreen?                              |
| `os-windowed`                   | Is windowed?                                |
