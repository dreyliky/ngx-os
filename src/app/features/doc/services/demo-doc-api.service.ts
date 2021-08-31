import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doc } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class DemoDocApiService {
    constructor(
        private readonly http: HttpClient
    ) {}

    public get(): Observable<Doc> {
        return this.http.get<Doc>(`/assets/demo-doc/documentation.json`);
    }
}
