import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'file-explorer-app',
    templateUrl: './file-explorer.component.html',
    styleUrls: ['./file-explorer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileExplorerAppComponent {}
