import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * @description
 * Base service for work with MD files from library/docs folder.
 * Allows getting markdown content from a specific file.
 * Each inheritor class must define value for `sectionUrl` field,
 * which is a subfolder of library/docs folder from which will request content.
 **/
export abstract class BaseLibraryDocumentationService<T> {
    protected readonly baseUrl: string = '/assets/docs';
    protected readonly abstract sectionUrl: string;

    constructor(
        protected readonly http: HttpClient
    ) {}

    public getAsMarkdown(fileName: T): Observable<string> {
        return this.http.get<string>(`${this.baseUrl}${this.sectionUrl}${fileName}.md`, {
            responseType: 'text' as any
        });
    }
}
