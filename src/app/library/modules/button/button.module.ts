import { NgModule } from '@angular/core';
import { ɵSharedModule } from '../shared.module';
import { ButtonComponent, ButtonLinkComponent } from './components';

@NgModule({
    declarations: [
        ButtonComponent,
        ButtonLinkComponent
    ],
    imports: [
        ɵSharedModule
    ],
    exports: [
        ButtonComponent,
        ButtonLinkComponent
    ]
})
export class ButtonModule {}
