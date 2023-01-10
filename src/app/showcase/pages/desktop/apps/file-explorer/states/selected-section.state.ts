import { Injectable } from '@angular/core';
import { NgxState, ObjectState } from 'ngx-base-state';
import { TreeNode } from 'ngx-os';
import { Section, SECTIONS } from '../core';

@Injectable()
@NgxState()
export class SelectedSectionState extends ObjectState<TreeNode<Section>> {
    constructor() {
        super(SECTIONS[0]);
    }
}
