import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonDocumentationEnum } from '../enums';

@Injectable({
    providedIn: 'root'
})
export class LibraryCommonDocumentationService {
    private readonly baseUrl: string = '/assets/docs';

    constructor(
        private readonly http: HttpClient
    ) {}

    public getAsMarkdown(type: CommonDocumentationEnum): Observable<string> {
        return this.http.get<string>(`${this.baseUrl}${type}.md`, {
            responseType: 'text' as any
        });
    }
}
