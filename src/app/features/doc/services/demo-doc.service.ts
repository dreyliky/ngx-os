import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Doc, DocComponent } from '../interfaces';
import { DemoDocState } from '../states';
import { BaseDocService } from './base-doc.service';
import { DemoDocApiService } from './demo-doc-api.service';

@Injectable({
    providedIn: 'root'
})
export class DemoDocService extends BaseDocService {
    constructor(
        private readonly api: DemoDocApiService,
        private readonly state: DemoDocState
    ) {
        super();
    }

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
