import { Injectable } from '@angular/core';
import { ExamplesDocumentationService, LibraryDocumentationService } from '@features/documentation';
import { forkJoin } from 'rxjs';

@Injectable()
export class ShowcaseConfig {
    constructor(
        private readonly libDocService: LibraryDocumentationService,
        private readonly showcaseDocService: ExamplesDocumentationService
    ) {}

    public load(): Promise<any> {
        return forkJoin([
            this.libDocService.update(),
            this.showcaseDocService.update()
        ])
            .toPromise();
    }
}
