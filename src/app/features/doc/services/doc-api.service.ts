import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doc } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class DocApiService {

    constructor (
        private readonly http: HttpClient
    ) {}

    public get (): Observable<Doc> {
        return this.http.get<Doc>(`/assets/doc/documentation.json`);
    }

}
