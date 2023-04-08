import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { AccentColorService } from './accent-color.service';

describe('AccentColorService', () => {
    let service: AccentColorService;
    let documentElement: HTMLElement;

    beforeEach(() => {
        const module = TestBed.configureTestingModule({
            providers: [AccentColorService]
        });

        service = module.inject(AccentColorService);
        documentElement = module.inject(DOCUMENT).documentElement;
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get color value from CSS variable', () => {
        const colorType = 'primary';
        const cssColor = '255, 255, 255';

        documentElement.style.setProperty(`--os-${colorType}-color`, cssColor);

        expect(service.get(colorType)).toEqual({ r: 255, g: 255, b: 255 });
    });

    it('should set color value into CSS variable', () => {
        const colorType = 'primary';
        const color = { r: 255, g: 255, b: 255 };

        service.apply(colorType, color);

        expect(
            documentElement.style
                .getPropertyValue(`--os-${colorType}-color`)
        )
            .toEqual('255, 255, 255');
    });
});
