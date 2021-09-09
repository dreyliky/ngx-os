import { Injectable } from '@angular/core';
import { ExamplesDocumentationService, LibraryDocumentationService } from '@Features/documentation';
import { forkJoin } from 'rxjs';

@Injectable()
export class DemoConfig {
    constructor(
        private readonly libDocService: LibraryDocumentationService,
        private readonly demoDocService: ExamplesDocumentationService
    ) {}

    public load(): Promise<any> {
        return forkJoin([
            this.libDocService.update(),
            this.demoDocService.update()
        ])
            .toPromise();
    }
}
