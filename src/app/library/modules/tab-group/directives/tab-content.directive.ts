import { Directive } from '@angular/core';

@Directive({
    selector: '[osTabContent]',
    exportAs: 'osTabContent'
})
export class TabContentDirective {}
