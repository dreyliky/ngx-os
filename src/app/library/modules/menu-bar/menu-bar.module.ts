import { NgModule } from '@angular/core';
import { ɵSharedModule } from '../shared.module';
import { MenuBarButtonComponent, MenuBarComponent } from './components';

@NgModule({
    declarations: [
        MenuBarComponent,
        MenuBarButtonComponent
    ],
    imports: [
        ɵSharedModule
    ],
    exports: [
        MenuBarComponent,
        MenuBarButtonComponent
    ]
})
export class MenuBarModule {}
