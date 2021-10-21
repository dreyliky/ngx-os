import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LibraryThemingDocumentationService } from '@features/documentation';
import { OsBaseViewComponent } from 'ngx-os';
import { Observable } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { OverviewService } from '../../overview.service';

@Component({
    selector: 'showcase-theming',
    templateUrl: './theming.component.html',
    styleUrls: ['./theming.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemingComponent extends OsBaseViewComponent implements OnInit {
    public markdownContent$: Observable<string>;
    public contentGithubUrl: string;

    constructor(
        private readonly titleService: Title,
        private readonly documentationService: LibraryThemingDocumentationService,
        private readonly overviewService: OverviewService,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        super();
    }

    public ngOnInit(): void {
        this.titleService.setTitle(`ngx-os - ${this.overviewService.metaInfo.name} Theming`);
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
