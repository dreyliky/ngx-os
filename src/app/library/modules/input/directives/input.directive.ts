import { Directive } from '@angular/core';

@Directive({
    selector: 'input[osInput], textarea[osInput]',
    host: {
        'class': 'os-input'
    },
    exportAs: 'osInput'
})
export class InputDirective {}
