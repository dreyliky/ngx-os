import { NgModule } from '@angular/core';
import { TestModule } from './test';

@NgModule({
    imports: [
        TestModule
    ],
    exports: [
        TestModule
    ]
})
export class FeaturesModule {}
