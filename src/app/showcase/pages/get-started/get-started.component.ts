import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GuideDocumentationEnum, LibraryGuideDocumentationService } from '@features/documentation';
import { Observable } from 'rxjs';

@Component({
    selector: 'showcase-get-started',
    templateUrl: './get-started.component.html',
    styleUrls: ['./get-started.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GetStartedComponent implements OnInit {
    public markdownContent$: Observable<string>;

    public get getStartedPagePath(): string {
        return 'https://github.com/dreyliky/ngx-os/blob/master/src/app/library/docs/guides/get-started.md';
    }

    constructor(
        private readonly documentationService: LibraryGuideDocumentationService
    ) {}

    public ngOnInit(): void {
        this.markdownContent$ = this.documentationService.getAsMarkdown(GuideDocumentationEnum.GetStarted);
    }
}
