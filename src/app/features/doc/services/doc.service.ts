import { Injectable, Type } from '@angular/core';
import { first } from 'rxjs/operators';
import { Doc, DocComponent } from '../interfaces';
import { DocStateService } from './doc-state.service';

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

    public getUniqueDocComponentInputs(docComponent: DocComponent): any {
        const inputNames = docComponent.inputsClass.map((input) => input.name);

        return docComponent.inputsClass
            .filter((input, index) => inputNames.indexOf(input.name) === index);
    }

    public getUniqueDocComponentOutputs(docComponent: DocComponent): any {
        const outputNames = docComponent.outputsClass.map((output) => output.name);

        return docComponent.outputsClass
            .filter((output, index) => outputNames.indexOf(output.name) === index);
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
