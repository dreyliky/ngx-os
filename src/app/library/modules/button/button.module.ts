import { NgModule } from '@angular/core';
import { ɵSharedModule } from '../shared.module';
import { ButtonDirective, ButtonLinkDirective } from './directives';

@NgModule({
    declarations: [
        ButtonDirective,
        ButtonLinkDirective
    ],
    imports: [
        ɵSharedModule
    ],
    exports: [
        ButtonDirective,
        ButtonLinkDirective
    ]
})
export class ButtonModule {}
