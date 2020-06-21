import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-browser',
    templateUrl: './browser.component.html',
    styleUrls: ['./browser.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrowserComponent implements OnInit {

    public homePage: SafeUrl;

    constructor (
        private readonly sanitizer: DomSanitizer
    ) {
        this.homePage = this.sanitizer.bypassSecurityTrustResourceUrl('https://bing.com');
    }

    public ngOnInit (): void {}

}
