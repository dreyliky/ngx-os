## Description

Allows specifying by the user a numeric value that must be no less than a given value, and no more than another given value.

```html
<os-slider
    [label]="'Sound volume'"
    [min]="0"
    [max]="100"
    [(ngModel)]="myValueField">
</os-slider>
```
