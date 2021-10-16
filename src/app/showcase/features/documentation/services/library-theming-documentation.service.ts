import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OsComponentEnum } from '../enums';
import { BaseLibraryDocumentationService } from './base-library-documentation.service';

/**
 * @description
 * Allows to request content from library/docs/theming MD files
 **/
@Injectable({
    providedIn: 'root'
})
export class LibraryThemingDocumentationService
    extends BaseLibraryDocumentationService<OsComponentEnum> {
    protected readonly sectionUrl: string = '/theming/';

    constructor(
        http: HttpClient
    ) {
        super(http);
    }
}
