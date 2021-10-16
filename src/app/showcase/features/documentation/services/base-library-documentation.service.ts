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
    protected readonly baseUrl = '/assets/docs';
    protected readonly baseGithubUrl = 'https://github.com/dreyliky/ngx-os' +
        '/blob/master/src/app/library/docs';

    protected readonly abstract sectionUrl: string;

    constructor(
        protected readonly http: HttpClient
    ) {}

    public getGithubUrl(fileName: T): string {
        return `${this.baseGithubUrl}${this.sectionUrl}${fileName}.md`;
    }

    public getAsMarkdown(fileName: T): Observable<string> {
        return this.http.get<string>(`${this.baseUrl}${this.sectionUrl}${fileName}.md`, {
            responseType: 'text' as any
        });
    }
}
