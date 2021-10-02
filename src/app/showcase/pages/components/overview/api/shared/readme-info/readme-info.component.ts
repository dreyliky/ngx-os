import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'api-readme-info',
    templateUrl: './readme-info.component.html',
    styleUrls: ['./readme-info.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReadmeInfoComponent {
    @Input()
    public readonly readmeInfo: string;
}
