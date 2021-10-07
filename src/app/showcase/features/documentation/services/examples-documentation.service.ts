import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Doc, DocComponent } from '../interfaces';
import { ExamplesDocumentationState } from '../states';

@Injectable({
    providedIn: 'root'
})
export class ExamplesDocumentationService {
    constructor(
        private readonly http: HttpClient,
        private readonly state: ExamplesDocumentationState
    ) {}

    public update(): Observable<Doc> {
        return this.http.get<Doc>(`/assets/showcase-doc/documentation.json`)
            .pipe(
                tap((documentation) => console.log('showcase-doc', documentation)),
                tap((documentation) => this.state.set(documentation))
            );
    }

    public findDocComponentByType(componentType: Type<any>): DocComponent {
        return this.state.data.components
            .find((component) => component.name === componentType.name);
    }
}
