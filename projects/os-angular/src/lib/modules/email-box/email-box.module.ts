import { NgModule } from '@angular/core';
import { SharedModule } from '@lib-shared';
import { EmailBoxComponent } from './components';

@NgModule({
    declarations: [
        EmailBoxComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        EmailBoxComponent
    ]
})
export class EmailBoxModule {}
