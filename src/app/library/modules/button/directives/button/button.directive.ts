import { Directive } from '@angular/core';

/** Transforms HTML button to button in os style */
@Directive({
    selector: 'button[osButton]',
    host: {
        'class': 'os-button'
    },
    exportAs: 'osButton'
})
export class ButtonDirective {}
