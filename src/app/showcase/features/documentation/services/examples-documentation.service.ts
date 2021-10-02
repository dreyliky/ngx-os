import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Doc, DocComponent } from '../interfaces';
import { ExamplesDocumentationState } from '../states';
import { ExamplesDocumentationApiService } from './examples-documentation-api.service';

@Injectable({
    providedIn: 'root'
})
export class ExamplesDocumentationService {
    constructor(
        private readonly api: ExamplesDocumentationApiService,
        private readonly state: ExamplesDocumentationState
    ) {}

    public update(): Observable<Doc> {
        return this.api.get()
            .pipe(
                tap((documentation) => console.log('demo-doc', documentation)),
                tap((documentation) => this.state.set(documentation))
            );
    }

    public findDocComponentByType(componentType: Type<any>): DocComponent {
        return this.state.data.components
            .find((component) => component.name === componentType.name);
    }
}
