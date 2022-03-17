import { NgModule } from '@angular/core';
import { ɵSharedModule } from '../shared.module';
import { MenuBarButtonComponent, MenuBarComponent, MenuBarItemComponent } from './components';
import { MenuBarDirective } from './directives';

@NgModule({
    declarations: [
        MenuBarComponent,
        MenuBarButtonComponent,
        MenuBarItemComponent,
        MenuBarDirective
    ],
    imports: [
        ɵSharedModule
    ],
    exports: [
        MenuBarComponent,
        MenuBarButtonComponent,
        MenuBarItemComponent,
        MenuBarDirective
    ]
})
export class MenuBarModule {}
