import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
    selector: 'browser-app',
    templateUrl: './browser.component.html',
    styleUrls: ['./browser.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrowserAppComponent {
    public initialPage: SafeUrl;

    constructor(
        private sanitizer: DomSanitizer
    ) {
        this.initialPage = this.sanitizer.bypassSecurityTrustResourceUrl('https://bing.com');
    }
}
