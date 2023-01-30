import { Injectable } from '@angular/core';
import { NgxState, ObjectState } from 'ngx-base-state';
import { Section, SECTIONS } from '../core';

@Injectable()
@NgxState()
export class SelectedSectionState extends ObjectState<Section> {
    constructor() {
        super(SECTIONS[0]);
    }
}
