import { Injectable } from '@angular/core';
import { NgxState, ObjectState } from 'ngx-base-state';
import { TextDocument } from '../../../features/file-system';

@Injectable()
@NgxState()
export class OpenedDocumentState extends ObjectState<TextDocument> {}
