import { NgModule } from '@angular/core';
import { ɵSharedModule } from '../shared.module';
import { MenuBarButtonComponent, MenuBarComponent, MenuBarItemComponent } from './components';
import { MenuBarActionDirective, MenuBarDirective } from './directives';

@NgModule({
    declarations: [
        MenuBarComponent,
        MenuBarButtonComponent,
        MenuBarItemComponent,
        MenuBarDirective,
        MenuBarActionDirective
    ],
    imports: [
        ɵSharedModule
    ],
    exports: [
        MenuBarComponent,
        MenuBarButtonComponent,
        MenuBarItemComponent,
        MenuBarDirective,
        MenuBarActionDirective
    ]
})
export class MenuBarModule {}
