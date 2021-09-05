import {
    DocClassProperty,
    DocComponent,
    DocDirective,
    DocInjectable,
    InputsClass,
    Method,
    MethodsClass
} from '../interfaces';

export abstract class BaseDocService {
    protected readonly publicModifierId: number = 122;

    protected readonly forbiddenMethodStartsWithPhrase: string[] = [
        'ng',
        'on',
        'registerOn',
        'writeValue'
    ];

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

    public getDocComponentActualPublicMethods(docComponent: DocComponent): MethodsClass[] {
        return docComponent.methodsClass
            .filter((method) => {
                return (
                    method.modifierKind.includes(this.publicModifierId) &&
                    this.forbiddenMethodStartsWithPhrase
                        .every((phrase) => !method.name.startsWith(phrase))
                );
            });
    }

    public getDocInjectablePublicMethods(docInjectable: DocInjectable): Method[] {
        return docInjectable.methods
            .filter((method) => method.modifierKind.includes(this.publicModifierId));
    }
}
