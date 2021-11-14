import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Section, SectionEnum } from '../../core';

@Component({
    selector: 'settings-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent {
    @Input()
    public selectedSection: Section;

    public readonly sectionEnum = SectionEnum;
}
