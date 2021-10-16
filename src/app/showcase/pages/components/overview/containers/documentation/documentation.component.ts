import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LibraryModuleDocumentationService } from '@features/documentation';
import { OsBaseViewComponent } from 'ngx-os';
import { Observable } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { OverviewService } from '../../overview.service';

@Component({
    selector: 'showcase-documentation',
    templateUrl: './documentation.component.html',
    styleUrls: ['./documentation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentationComponent extends OsBaseViewComponent implements OnInit {
    public markdownContent$: Observable<string>;
    public contentGithubUrl: string;

    constructor(
        private readonly documentationService: LibraryModuleDocumentationService,
        private readonly overviewService: OverviewService,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    public ngOnInit(): void {
        this.initMarkdownContentObservable();
        this.initContentGithubUrlObserver();
    }

    private initMarkdownContentObservable(): void {
        this.markdownContent$ = this.overviewService.metaInfo$
            .pipe(
                switchMap(({ type }) => this.documentationService.getAsMarkdown(type))
            );
    }

    private initContentGithubUrlObserver(): void {
        this.overviewService.metaInfo$
            .pipe(takeUntil(this.viewDestroyed$))
            .subscribe(({ type }) => {
                this.contentGithubUrl = this.documentationService.getGithubUrl(type);

                this.changeDetector.detectChanges();
            });
    }
}
