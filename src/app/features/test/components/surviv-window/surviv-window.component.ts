import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-surviv-window',
    templateUrl: './surviv-window.component.html',
    styleUrls: ['./surviv-window.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SurvivWindowComponent implements OnInit {

    public src: SafeUrl;

    constructor (
        private readonly sanitizer: DomSanitizer
    ) {
        this.src = this.sanitizer.bypassSecurityTrustResourceUrl('https://surviv.io');
    }

    public ngOnInit (): void {}

}
