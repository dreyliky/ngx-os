import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Section, SECTIONS } from '../../core';

@Component({
    selector: 'settings-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
    @Input()
    public readonly selectedSection: Section;

    @Output()
    public sectionChange = new EventEmitter<Section>();

    public readonly sections = SECTIONS;
}