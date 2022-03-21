import { Injectable } from '@angular/core';
import { ArrayState } from '@core/classes';
import { TextDocument } from '../interfaces';

@Injectable()
export class TextDocumentsState extends ArrayState<TextDocument> {}
