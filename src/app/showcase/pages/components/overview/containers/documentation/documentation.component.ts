import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LibraryModuleDocumentationService } from '@features/documentation';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { OverviewService } from '../../overview.service';

@Component({
    selector: 'showcase-documentation',
    templateUrl: './documentation.component.html',
    styleUrls: ['./documentation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentationComponent implements OnInit {
    public markdownContent$: Observable<string>;
    public contentGithubUrl: string;

    constructor(
        private readonly documentationService: LibraryModuleDocumentationService,
        private readonly overviewService: OverviewService
    ) {}

    public ngOnInit(): void {
        this.initMarkdownContentObservable();
    }

    private initMarkdownContentObservable(): void {
        this.markdownContent$ = this.overviewService.metaInfo$
            .pipe(
                tap(({ type }) => this.contentGithubUrl = this.documentationService.getGithubUrl(type)),
                switchMap(({ type }) => this.documentationService.getAsMarkdown(type))
            );
    }
}
