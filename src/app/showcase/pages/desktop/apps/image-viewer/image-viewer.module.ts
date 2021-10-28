import { NgModule } from '@angular/core';
import { SharedModule } from '@shared';
import { ImageViewerAppComponent } from './image-viewer.component';

@NgModule({
    declarations: [
        ImageViewerAppComponent
    ],
    imports: [
        SharedModule
    ]
})
export class ImageViewerAppModule {}
