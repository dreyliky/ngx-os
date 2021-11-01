import { OsComponentEnum, OsComponentOverviewSectionEnum } from '../enums';
import { DemoComponentMetaInfo } from './demo-component-meta-info.interface';

/**
 * @description
 * Lib features are strings because after code minification there are no
 * "constructor.name" same value in production as in the development build.
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
