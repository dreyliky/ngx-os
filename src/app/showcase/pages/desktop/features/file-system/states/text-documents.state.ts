import { Injectable } from '@angular/core';
import { ArrayState, NgxState } from 'ngx-base-state';
import { TextDocument } from '../interfaces';

@Injectable()
@NgxState()
export class TextDocumentsState extends ArrayState<TextDocument> {}
