import { Directive } from '@angular/core';

/** Transforms HTML button to link-button in os style */
@Directive({
    selector: 'button[osButtonLink]',
    host: {
        'class': 'os-button-link'
    },
    exportAs: 'osButtonLink'
})
export class ButtonLinkDirective {}
