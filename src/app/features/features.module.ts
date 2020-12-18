import { NgModule } from '@angular/core';
import { TestModule } from './test';
import { DesktopModule } from './desktop';

@NgModule({
    imports: [
        TestModule,
        DesktopModule
    ],
    exports: [
        TestModule,
        DesktopModule
    ]
})
export class FeaturesModule {}
