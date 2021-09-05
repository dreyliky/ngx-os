import {
    DocClassProperty, DocDirective,
    DocInjectable
} from '../interfaces';

export abstract class BaseDocService {
    protected readonly publicModifierId: number = 122;

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
