import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuidesComponent } from './guides.component';
import { UrlParamEnum } from './url-param.enum';

const routes: Routes = [
    {
        path: `:${UrlParamEnum.GuideId}`,
        component: GuidesComponent
    },
    {
        path: '',
        component: GuidesComponent
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
export class GuidesRoutingModule {}
