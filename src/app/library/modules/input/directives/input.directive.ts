import { Directive } from '@angular/core';

/** Transforms HTML input to input in os style */
@Directive({
    selector: 'input[osInput], textarea[osInput]',
    host: {
        'class': 'os-input os-scroll-view'
    },
    exportAs: 'osInput'
})
export class InputDirective {}
