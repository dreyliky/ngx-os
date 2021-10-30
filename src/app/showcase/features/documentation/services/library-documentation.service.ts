import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
    Doc,
    DocClass,
    DocComponent,
    DocDirective,
    DocEnum,
    DocInjectable,
    DocInterface,
    DocModule,
    DocTypealias,
    DocVariable
} from '../interfaces';
import { LibraryDocumentationState } from '../states';

@Injectable({
    providedIn: 'root'
})
export class LibraryDocumentationService {
    constructor(
        private readonly http: HttpClient,
        private readonly state: LibraryDocumentationState
    ) {}

    public update(): Observable<Doc> {
        return this.http.get<Doc>(`/assets/library-doc/documentation.json`)
            .pipe(
                tap((documentation) => console.log('library-documentation', documentation)),
                tap((documentation) => this.state.set(documentation))
            );
    }

    public findDocModulesByTypes(moduleNames: string[]): DocModule[] {
        return moduleNames
            .map((moduleName) => {
                return this.state.data.modules
                    .find((module) => module.name === moduleName);
            });
    }

    public findDocInjectablesByTypes(serviceNames: string[]): DocInjectable[] {
        return serviceNames
            .map((serviceName) => {
                return this.state.data.injectables
                    .find((service) => service.name === serviceName);
            });
    }

    public findDocDirectivesByTypes(directiveNames: string[]): DocDirective[] {
        return directiveNames
            .map((directiveName) => {
                return this.state.data.directives
                    .find((directive) => directive.name === directiveName);
            });
    }

    public findDocComponentsByTypes(componentNames: string[]): DocComponent[] {
        return componentNames
            .map((componentName) => {
                return this.state.data.components
                    .find((component) => component.name === componentName);
            });
    }

    public findDocClassesByTypes(classNames: string[]): DocClass[] {
        return classNames
            .map((className) => {
                return this.state.data.classes
                    .find((currentClass) => currentClass.name === className);
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

    public findDocVariablesByNames(variableNames: string[]): DocVariable[] {
        return variableNames
            .map((variableName) => {
                return this.state.data.miscellaneous.variables
                    .find((docVar) => docVar.name === variableName);
            });
    }
}
