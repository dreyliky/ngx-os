import { Type } from '@angular/core';
import { OsComponentEnum } from '../enums';
import { DemoComponentMetaInfo } from './demo-component-meta-info.interface';

export interface ComponentMetaInfo {
    name: string;
    type: OsComponentEnum;
    shortInfo: string;
    imageUrl: string;
    libModules?: Type<any>[];
    libServices?: Type<any>[];
    libDirectives?: Type<any>[];
    libComponents?: Type<any>[];
    libInterfaces?: string[];
    libEnums?: string[];
    libTypes?: string[];
    demoComponents?: DemoComponentMetaInfo[];
}
