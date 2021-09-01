import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
    Doc,
    DocComponent,
    DocDirective,
    DocEnum,
    DocInjectable,
    DocInterface,
    DocModule,
    DocTypealias
} from '../interfaces';
import { LibDocState } from '../states';
import { BaseDocService } from './base-doc.service';
import { LibDocApiService } from './lib-doc-api.service';

@Injectable({
    providedIn: 'root'
})
export class LibDocService extends BaseDocService {
    constructor(
        private readonly api: LibDocApiService,
        private readonly state: LibDocState
    ) {
        super();
    }

    public update(): Observable<Doc> {
        return this.api.get()
            .pipe(
                tap((documentation) => console.log('lib-doc', documentation)),
                tap((documentation) => this.state.set(documentation))
            );
    }

    public findDocModulesByTypes(moduleTypes: Type<any>[]): DocModule[] {
        return moduleTypes
            .map((moduleType) => {
                return this.state.data.modules
                    .find((module) => module.name === moduleType.name);
            });
    }

    public findDocInjectablesByTypes(serviceTypes: Type<any>[]): DocInjectable[] {
        return serviceTypes
            .map((serviceType) => {
                return this.state.data.injectables
                    .find((service) => service.name === serviceType.name);
            });
    }

    public findDocDirectivesByTypes(directiveTypes: Type<any>[]): DocDirective[] {
        return directiveTypes
            .map((directiveType) => {
                return this.state.data.directives
                    .find((directive) => directive.name === directiveType.name);
            });
    }

    public findDocComponentsByTypes(componentTypes: Type<any>[]): DocComponent[] {
        return componentTypes
            .map((componentType) => {
                return this.state.data.components
                    .find((component) => component.name === componentType.name);
            });
    }

    public findDocInterfacesByNames(interfaceNames: string[]): DocInterface[] {
        return interfaceNames
            .map((interfaceName) => {
                return this.state.data.interfaces
                    .find((docInterface) => docInterface.name === interfaceName);
            });
    }

    public findDocEnumsByNames(enumNames: string[]): DocEnum[] {
        return enumNames
            .map((enumName) => {
                return this.state.data.miscellaneous.enumerations
                    .find((docEnum) => docEnum.name === enumName);
            });
    }

    public findDocTypesByNames(typeNames: string[]): DocTypealias[] {
        return typeNames
            .map((typeName) => {
                return this.state.data.miscellaneous.typealiases
                    .find((docType) => docType.name === typeName);
            });
    }
}
