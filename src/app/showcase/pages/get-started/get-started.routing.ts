import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetStartedComponent } from './get-started.component';
import { UrlParamEnum } from './url-param.enum';

const routes: Routes = [
    {
        path: `:${UrlParamEnum.GuideId}`,
        component: GetStartedComponent
    },
    {
        path: '',
        component: GetStartedComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class GetStartedRoutingModule {}
