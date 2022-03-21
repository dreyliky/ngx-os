import { Injectable } from '@angular/core';
import { BaseState } from '@core/classes';
import { TextDocument } from '../../../features/file-system';

@Injectable()
export class OpenedDocumentState extends BaseState<TextDocument> {}
