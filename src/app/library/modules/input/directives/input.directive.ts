import { Directive } from '@angular/core';

@Directive({
    selector: 'input[osInput], textarea[osInput]',
    host: {
        'class': 'os-input os-scroll-view'
    },
    exportAs: 'osInput'
})
export class InputDirective {}
