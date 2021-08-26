import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Section, SECTIONS } from './core';

@Component({
    selector: 'settings-app',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsAppComponent implements OnInit {
    public selectedSection: Section;

    public ngOnInit(): void {
        this.selectedSection = SECTIONS[0];
    }

    public onSectionChange(section: Section): void {
        this.selectedSection = section;
    }
}
