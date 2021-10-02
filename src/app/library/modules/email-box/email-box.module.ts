import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
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
