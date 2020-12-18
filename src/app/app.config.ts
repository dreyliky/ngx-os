import { Injectable } from '@angular/core';
import { Doc, DocApiService, DocStateService } from '@Features/doc';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AppConfig {

    constructor (
        private readonly docApiService: DocApiService,
        private readonly docStateService: DocStateService
    ) {}

    public load (): any {
        return this.updateDoc()
            .toPromise()
            .catch(() => {
                return true;
            });
    }

    private updateDoc (): Observable<Doc> {
        return this.docApiService.get()
            .pipe(
                tap((doc) => this.docStateService.setDoc(doc))
            );
    }

}
