import { Type } from "@angular/core";
import { ComponentType } from "../types";

export interface ComponentDescription {

    name: string;
    type: ComponentType;
    shortInfo: string;
    imageUrl: string;
    libComponents?: Type<any>[];
    demoComponents?: Type<any>[];

}
