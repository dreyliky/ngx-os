import { Injectable, Type } from "@angular/core";
import { first } from "rxjs/operators";
import { Doc, DocComponent } from "../interfaces";
import { DocStateService } from "./doc-state.service";

@Injectable({
    providedIn: 'root'
})
export class DocService {

    private libDoc: Doc;
    private demoDoc: Doc;

    constructor(
        private readonly docStateService: DocStateService
    ) {
        this.updateLibDocData();
        this.updateDemoDocData();
    }

    public getLibDocComponentsByTypes(componentTypes: Type<any>[]): DocComponent[] {
        const componentNames: string[] = componentTypes
            .map((componentType) => componentType.name);

        return this.libDoc.components.filter((component) => {
            return componentNames.includes(component.name);
        });
    }

    public getDemoDocComponentByName(componentType: Type<any>): DocComponent {
        return this.demoDoc.components
            .find((component) => component.name === componentType.name);
    }

    private updateLibDocData(): void {
        this.docStateService.libDoc$
            .pipe(
                first()
            )
            .subscribe((doc) => this.libDoc = doc);
    }

    private updateDemoDocData(): void {
        this.docStateService.demoDoc$
            .pipe(
                first()
            )
            .subscribe((doc) => this.demoDoc = doc);
    }

}
