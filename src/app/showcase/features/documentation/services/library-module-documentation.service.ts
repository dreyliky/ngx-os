import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OsComponentEnum } from '../enums';
import { BaseLibraryDocumentationService } from './base-library-documentation.service';

/**
 * @description
 * Allows to request content from library/docs/modules MD files
 **/
@Injectable({
    providedIn: 'root'
})
export class LibraryModuleDocumentationService extends BaseLibraryDocumentationService<OsComponentEnum> {
    protected readonly sectionUrl: string = '/modules/';

    constructor(
        http: HttpClient
    ) {
        super(http);
    }
}
