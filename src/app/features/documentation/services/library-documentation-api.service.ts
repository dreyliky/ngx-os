import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doc } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class LibraryDocumentationApiService {
    constructor(
        private readonly http: HttpClient
    ) {}

    public get(): Observable<Doc> {
        return this.http.get<Doc>(`/assets/lib-doc/documentation.json`);
    }
}
