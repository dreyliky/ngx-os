import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
    let service: ThemeService;
    let document: Document;

    beforeEach(() => {
        const module = TestBed.configureTestingModule({
            providers: [
                ThemeService
            ]
        });

        service = module.inject(ThemeService);
        document = module.inject(DOCUMENT);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should apply theme', () => {
        const themeName = 'test-theme';
        const themeLinkElement = (service as any).themeLinkElement as HTMLLinkElement;

        service.apply(themeName);

        expect(themeLinkElement.getAttribute('href')).toEqual(`${themeName}.css`);
        expect(document.body.classList.contains(themeName)).toBeTruthy();
        expect(service.applied).toEqual(themeName);
        service.applied$.subscribe((appliedTheme) => {
            expect(appliedTheme).toEqual(themeName);
        });
    });

    it('should contain link element in head', () => {
        const themeLinkElement = (service as any).themeLinkElement as HTMLLinkElement;
        const documentLinks = document.head.querySelectorAll('link');

        expect(Array.from(documentLinks).includes(themeLinkElement)).toBeTrue();
        expect(themeLinkElement).toBeTruthy();
        expect(themeLinkElement.tagName).toEqual('LINK');
        expect(themeLinkElement.getAttribute('rel')).toEqual('stylesheet');
        expect(themeLinkElement.getAttribute('type')).toEqual('text/css');
    });
});
