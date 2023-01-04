import { Injectable } from '@angular/core';
import { NgxState, PrimitiveState } from 'ngx-base-state';

@Injectable()
@NgxState()
export class EditorState extends PrimitiveState<string> {}
