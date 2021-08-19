import { Injectable, Type } from '@angular/core';
import { first } from 'rxjs/operators';
import { Doc, DocComponent, MethodsClass } from '../interfaces';
import { DocStateService } from './doc-state.service';

@Injectable({
    providedIn: 'root'
})
export class DocService {
    private libDoc: Doc;
    private demoDoc: Doc;

    private readonly publicMethodModifier: number = 114;

    private readonly forbiddenMethodNames: string[] = [
        'ngOnInit', 'ngOnDestroy', 'ngAfterViewInit', 'ngOnChange',
        'ngAfterContentInit', 'registerOnChange', 'registerOnTouched',
        'writeValue', 'onChange', 'onTouched'
    ];

    private readonly forbiddenMethodStartsWithPhrase: string[] = [
        'on'
    ];

    constructor(
        private readonly docStateService: DocStateService
    ) {
        this.updateLibDocData();
        this.updateDemoDocData();
    }

    public getLibDocComponentsByTypes(componentTypes: Type<any>[]): DocComponent[] {
        return componentTypes
            .map((componentType) => {
                return this.libDoc.components
                    .find((component) => component.name === componentType.name);
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

    public getDocComponentActualPublicMethods(docComponent: DocComponent): MethodsClass[] {
        return docComponent.methodsClass
            .filter((method) => {
                return (
                    method.modifierKind.includes(this.publicMethodModifier)
                    &&
                    !this.forbiddenMethodNames.includes(method.name)
                    &&
                    this.forbiddenMethodStartsWithPhrase
                        .every((phrase) => !method.name.startsWith(phrase))
                );
            });
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
