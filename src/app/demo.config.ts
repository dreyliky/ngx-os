import { Injectable } from '@angular/core';
import { Doc, DocApiService, DocStateService } from '@Features/doc';
import { forkJoin, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class DemoConfig {

    constructor (
        private readonly docApiService: DocApiService,
        private readonly docStateService: DocStateService
    ) {}

    public load (): any {
        return forkJoin([
            this.updateLibDoc(),
            this.updateDemoDoc(),
        ])
            .toPromise()
            .catch(() => {
                return true;
            });
    }

    private updateLibDoc (): Observable<Doc> {
        return this.docApiService.getLibDoc()
            .pipe(
                tap((doc) => this.docStateService.setLibDoc(doc))
            );
    }

    private updateDemoDoc (): Observable<Doc> {
        return this.docApiService.getDemoDoc()
            .pipe(
                tap((doc) => this.docStateService.setDemoDoc(doc))
            );
    }

}
