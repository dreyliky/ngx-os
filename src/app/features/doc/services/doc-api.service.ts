import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doc } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class DocApiService {

    constructor(
        private readonly http: HttpClient
    ) {}

    public getLibDoc(): Observable<Doc> {
        return this.http.get<Doc>(`/assets/lib-doc/documentation.json`);
    }

    public getDemoDoc(): Observable<Doc> {
        return this.http.get<Doc>(`/assets/demo-doc/documentation.json`);
    }

}
