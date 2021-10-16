import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GuideDocumentationEnum } from '../enums';
import { BaseLibraryDocumentationService } from './base-library-documentation.service';

/**
 * @description
 * Allows to request content from library/docs/guides MD files
 **/
@Injectable({
    providedIn: 'root'
})
export class LibraryGuideDocumentationService
    extends BaseLibraryDocumentationService<GuideDocumentationEnum> {
    protected readonly sectionUrl: string = '/guides/';

    constructor(
        http: HttpClient
    ) {
        super(http);
    }
}
