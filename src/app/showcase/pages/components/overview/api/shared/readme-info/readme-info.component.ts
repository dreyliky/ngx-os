import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'api-readme-info',
    templateUrl: './readme-info.component.html',
    styleUrls: ['./readme-info.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReadmeInfoComponent {
    @Input()
    public set readmeInfo(readmeInfo: string) {
        this._readmeSafeHtml = this.domSanitizer.bypassSecurityTrustHtml(readmeInfo);
    }

    public get readmeSafeHtml(): SafeHtml {
        return this._readmeSafeHtml;
    }

    private _readmeSafeHtml: SafeHtml;

    constructor(
        private readonly domSanitizer: DomSanitizer
    ) {}
}
