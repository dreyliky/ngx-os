import { Directive } from '@angular/core';

@Directive({
    selector: 'input[osInput], textarea[osInput]',
    host: {
        'class': 'os-input'
    }
})
export class InputDirective {}
