import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-browser',
    templateUrl: './browser.component.html',
    styleUrls: ['./browser.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrowserComponent implements OnInit {

    @Input()
    public page: string;

    public src: SafeUrl;

    private readonly defaultPage: string = 'https://bing.com';

    constructor (
        private readonly sanitizer: DomSanitizer
    ) {
        this.src = this.sanitizer.bypassSecurityTrustResourceUrl(this.page || this.defaultPage);
    }

    public ngOnInit (): void {}

}
