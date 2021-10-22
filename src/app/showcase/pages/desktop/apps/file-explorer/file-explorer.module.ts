import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ContentComponent, SidebarComponent } from './components';
import { FileExplorerAppComponent } from './file-explorer.component';

@NgModule({
    declarations: [
        FileExplorerAppComponent,
        SidebarComponent,
        ContentComponent
    ],
    imports: [
        SharedModule
    ]
})
export class FileExplorerModule {}
