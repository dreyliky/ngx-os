import { Type } from '@angular/core';

export interface DemoComponentMetaInfo {
    title: string;
    /**
     * @description
     * Need for build in prod to avoid a bug with class constructor.name after code minification
     **/
    componentName: string;
    component: Type<any>;
    isOnlyForDevEnv?: boolean;
}
