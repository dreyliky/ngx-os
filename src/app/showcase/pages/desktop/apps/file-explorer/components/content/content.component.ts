import { ChangeDetectionStrategy, Component } from '@angular/core';

interface File {
    name: string;
    iconUrl: string;
}

@Component({
    selector: 'file-explorer-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent {
    public readonly files: File[] = [
        {
            name: 'File #1',
            iconUrl: '/assets/showcase/icons/icon.png'
        }
    ];
}
