import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { GuideDocumentationEnum, LibraryGuideDocumentationService } from '@features/documentation';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
    selector: 'get-started-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent {
    @Input()
    public set selectedGuideId(id: GuideDocumentationEnum) {
        this.contentGithubUrl = this.documentationService.getGithubUrl(id);

        this.initMarkdownContentObservable(id);
    }

    @Output()
    public contentLoadError = new EventEmitter();

    public contentGithubUrl: string;
    public markdownContent$: Observable<string>;

    constructor(
        private readonly documentationService: LibraryGuideDocumentationService
    ) {}

    private initMarkdownContentObservable(id: GuideDocumentationEnum): void {
        this.markdownContent$ = this.documentationService.getAsMarkdown(id)
            .pipe(
                catchError(() => {
                    this.contentLoadError.emit();

                    return of('');
                })
            );
    }
}
