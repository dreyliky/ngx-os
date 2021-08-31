import { DocComponent, DocInjectable, Method, MethodsClass } from '../interfaces';

export abstract class BaseDocService {
    protected readonly publicMethodModifier: number = 122;

    protected readonly forbiddenMethodStartsWithPhrase: string[] = [
        'ng',
        'on',
        'registerOn',
        'writeValue'
    ];

    public getUniqueDocComponentInputs(docComponent: DocComponent): any {
        const inputNames = docComponent.inputsClass.map((input) => input.name);

        return docComponent.inputsClass
            .filter((input, index) => inputNames.indexOf(input.name) === index);
    }

    public getDocInjectableProperties(docInjectable: DocInjectable): any {
        const propertieNames = docInjectable.properties.map((input) => input.name);

        return docInjectable.properties
            .filter((input, index) => propertieNames.indexOf(input.name) === index);
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
                    method.modifierKind.includes(this.publicMethodModifier) &&
                    this.forbiddenMethodStartsWithPhrase
                        .every((phrase) => !method.name.startsWith(phrase))
                );
            });
    }

    public getDocInjectablePublicMethods(docInjectable: DocInjectable): Method[] {
        return docInjectable.methods
            .filter((method) => method.modifierKind.includes(this.publicMethodModifier));
    }
}
