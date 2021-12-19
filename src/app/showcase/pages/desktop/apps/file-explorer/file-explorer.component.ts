import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TreeNode, ɵDeepClone } from 'ngx-os';
import { Section, SECTIONS } from './core';

@Component({
    selector: 'file-explorer-app',
    templateUrl: './file-explorer.component.html',
    styleUrls: ['./file-explorer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileExplorerAppComponent implements OnInit {
    public sections: TreeNode<Section>[] = ɵDeepClone(SECTIONS);
    public selectedSection: TreeNode<Section>;

    public ngOnInit(): void {
        this.selectedSection = this.sections[0];
    }

    public onSectionChange(section: TreeNode<Section>): void {
        this.selectedSection = section;
    }
}
