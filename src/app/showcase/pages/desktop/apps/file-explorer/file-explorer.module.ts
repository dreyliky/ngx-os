import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ContentComponent, SidebarComponent } from './components';
import { DesktopComponent, DocumentsComponent, PicturesComponent } from './containers';
import { FileExplorerAppComponent } from './file-explorer.component';

@NgModule({
    declarations: [
        FileExplorerAppComponent,
        SidebarComponent,
        ContentComponent,
        DesktopComponent,
        DocumentsComponent,
        PicturesComponent
    ],
    imports: [
        SharedModule
    ]
})
export class FileExplorerModule {}
