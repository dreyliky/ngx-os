import { Type } from '@angular/core';
import { OsComponentEnum, OsComponentOverviewSectionEnum } from '../enums';
import { DemoComponentMetaInfo } from './demo-component-meta-info.interface';

export interface ComponentMetaInfo {
    name: string;
    type: OsComponentEnum;
    shortInfo: string;
    imageUrl: string;
    forbiddenOverviewSections?: OsComponentOverviewSectionEnum[];
    libModules?: Type<any>[];
    libServices?: Type<any>[];
    libDirectives?: Type<any>[];
    libComponents?: Type<any>[];
    libClasses?: Type<any>[];
    libInterfaces?: string[];
    libEnums?: string[];
    libTypes?: string[];
    libVariables?: string[];
    demoComponents?: DemoComponentMetaInfo[];
}
