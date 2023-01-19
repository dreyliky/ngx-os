import { Directive } from '@angular/core';

@Directive({
    selector: 'button[osButtonLink]',
    host: {
        'class': 'os-button-link'
    },
    exportAs: 'osButtonLink'
})
export class ButtonLinkDirective {}
