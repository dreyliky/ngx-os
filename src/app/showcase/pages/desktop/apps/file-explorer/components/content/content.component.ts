import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TreeNode } from 'ngx-os';
import { Section, SectionEnum } from '../../core';

@Component({
    selector: 'file-explorer-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent {
    @Input()
    public sections: TreeNode<Section>[];

    @Input()
    public selectedSection: TreeNode<Section>;

    public readonly sectionEnum = SectionEnum;
}
