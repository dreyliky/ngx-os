import { OsComponentEnum, OsComponentOverviewSectionEnum } from '../enums';
import { DemoComponentMetaInfo } from './demo-component-meta-info.interface';

/**
 * @description
 * Lib features are strings because if pass a class and read its "name"
 * property - after build in prod will a bug with class namings.
 **/
export interface ComponentMetaInfo {
    name: string;
    type: OsComponentEnum;
    shortInfo: string;
    imageUrl: string;
    forbiddenOverviewSections?: OsComponentOverviewSectionEnum[];
    libModules?: string[];
    libServices?: string[];
    libDirectives?: string[];
    libComponents?: string[];
    libClasses?: string[];
    libInterfaces?: string[];
    libEnums?: string[];
    libTypes?: string[];
    libVariables?: string[];
    demoComponents?: DemoComponentMetaInfo[];
}
