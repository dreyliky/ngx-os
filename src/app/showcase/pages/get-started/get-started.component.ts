import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CommonDocumentationEnum, LibraryCommonDocumentationService } from '@features/documentation';
import { Observable } from 'rxjs';

@Component({
    selector: 'showcase-get-started',
    templateUrl: './get-started.component.html',
    styleUrls: ['./get-started.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GetStartedComponent implements OnInit {
    public content$: Observable<string>;

    constructor(
        private readonly titleService: Title,
        private readonly libraryCommonDocumentation: LibraryCommonDocumentationService
    ) {}

    public ngOnInit(): void {
        this.titleService.setTitle('ngx-os - Get Started');
        this.initContentObservable();
    }

    private initContentObservable(): void {
        this.content$ = this.libraryCommonDocumentation
            .getAsMarkdown(CommonDocumentationEnum.GetStarted);
    }
}
