import { Type } from '@angular/core';
import { ComponentType } from '../types';
import { DemoComponentMetaInfo } from './demo-component-meta-info.interface';

export interface ComponentMetaInfo {
    name: string;
    type: ComponentType;
    shortInfo: string;
    imageUrl: string;
    libComponents?: Type<any>[];
    libServices?: Type<any>[];
    demoComponents?: DemoComponentMetaInfo[];
}
