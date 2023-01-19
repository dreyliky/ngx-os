import { Directive } from '@angular/core';

@Directive({
    selector: 'button[osButton]',
    host: {
        'class': 'os-button'
    },
    exportAs: 'osButton'
})
export class ButtonDirective {}
