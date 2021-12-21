import { NgModule } from '@angular/core';
import { ɵSharedModule } from '../shared.module';
import { EmailBoxComponent } from './components';

@NgModule({
    declarations: [
        EmailBoxComponent
    ],
    imports: [
        ɵSharedModule
    ],
    exports: [
        EmailBoxComponent
    ]
})
export class EmailBoxModule {}
