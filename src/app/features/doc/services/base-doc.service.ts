import {
    DocClassProperty,
    DocComponent,
    DocDirective,
    DocInjectable,
    InputsClass
} from '../interfaces';

export abstract class BaseDocService {
    protected readonly publicModifierId: number = 122;

    public getUniqueDocComponentInputs(docComponent: DocComponent): InputsClass[] {
        const inputNames = docComponent.inputsClass.map((input) => input.name);

        return docComponent.inputsClass
            .filter((input, index) => inputNames.indexOf(input.name) === index);
    }

    public getDocDirectiveProperties(docDirective: DocDirective): DocClassProperty[] {
        return docDirective.propertiesClass
            .filter((prop) => prop.modifierKind.includes(this.publicModifierId));
    }

    public getDocInjectableProperties(docInjectable: DocInjectable): any {
        const propertieNames = docInjectable.properties.map((input) => input.name);

        return docInjectable.properties
            .filter((input, index) => propertieNames.indexOf(input.name) === index);
    }
}
