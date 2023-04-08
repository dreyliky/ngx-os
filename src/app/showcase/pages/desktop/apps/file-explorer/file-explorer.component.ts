import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Section } from './core';
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
    constructor(
        private readonly selectedSectionState: SelectedSectionState
    ) {}

    public onSectionChange(section: Section): void {
        this.selectedSectionState.set(section);
    }
}
