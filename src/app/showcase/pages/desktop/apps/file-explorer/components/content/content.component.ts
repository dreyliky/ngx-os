import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SectionEnum, SECTIONS } from '../../core';
import { SelectedSectionState } from '../../states';

@Component({
    selector: 'file-explorer-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent {
    public sections = SECTIONS;

    public readonly sectionEnum = SectionEnum;

    public readonly selectedSection$ = this.selectedSectionState.data$;

    constructor(
        private readonly selectedSectionState: SelectedSectionState
    ) {}
}
