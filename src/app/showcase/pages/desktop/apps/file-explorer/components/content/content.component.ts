import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TreeNode } from 'ngx-os';
import { Section, SectionEnum } from '../../core';
import { SelectedSectionState } from '../../states';

@Component({
    selector: 'file-explorer-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent {
    @Input()
    public sections: TreeNode<Section>[];

    public readonly sectionEnum = SectionEnum;

    public readonly selectedSection$ = this.selectedSectionState.data$;

    constructor(
        private readonly selectedSectionState: SelectedSectionState
    ) {}
}
