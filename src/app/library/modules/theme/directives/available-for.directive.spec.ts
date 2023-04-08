import { ElementRef, TemplateRef, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AvailableForOsDirective } from './available-for.directive';

describe('AvailableForOsDirective', () => {
    let directive: AvailableForOsDirective;
    let elementRef: ElementRef;
    let templateRef: TemplateRef<any>;
    let viewContainerRef: ViewContainerRef;

    beforeEach(() => {
        const module = TestBed.configureTestingModule({
            providers: [
                AvailableForOsDirective,
                ElementRef,
                TemplateRef,
                ViewContainerRef
            ]
        });

        directive = module.inject(AvailableForOsDirective);
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });
});
