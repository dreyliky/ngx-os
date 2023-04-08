import { Directive } from '@angular/core';

@Directive({
    selector: '[osTabLabel]',
    exportAs: 'osTabLabel'
})
export class TabLabelDirective {}
