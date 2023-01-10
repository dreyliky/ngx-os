import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TreeNode, ɵDeepClone } from 'ngx-os';
import { Section, SECTIONS } from './core';
import { SelectedSectionState } from './states';

@Component({
    selector: 'file-explorer-app',
    templateUrl: './file-explorer.component.html',
    styleUrls: ['./file-explorer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        SelectedSectionState
    ]
})
export class FileExplorerAppComponent {
    public sections: TreeNode<Section>[] = ɵDeepClone(SECTIONS);

    constructor(
        private readonly selectedSectionState: SelectedSectionState
    ) {}

    public onSectionChange(section: TreeNode<Section>): void {
        this.selectedSectionState.set(section);
    }
}
