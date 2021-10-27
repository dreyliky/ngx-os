import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

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
export class ContentComponent implements OnInit {
    public files: File[];

    public ngOnInit(): void {
        this.files = new Array(50)
            .fill(null)
            .map((_, index) => ({
                name: `File #${index + 1}`,
                iconUrl: '/assets/showcase/icons/icon.png'
            }));
    }
}
