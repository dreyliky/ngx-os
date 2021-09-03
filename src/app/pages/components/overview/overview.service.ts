import { Injectable, OnDestroy } from '@angular/core';
import {
    ComponentMetaInfo,
    DocComponent,
    DocDirective,
    DocEnum,
    DocInjectable,
    DocInterface,
    DocModule,
    DocTypealias,
    LibDocService
} from '@Features/doc';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class OverviewService implements OnDestroy {
    public get metaInfo$(): Observable<ComponentMetaInfo> {
        return this._metaInfo$.asObservable();
    }

    public get metaInfo(): ComponentMetaInfo {
        return this._metaInfo$.getValue();
    }

    public get docModules(): DocModule[] {
        return [...this._docModules];
    }

    public get docComponents(): DocComponent[] {
        return [...this._docComponents];
    }

    public get docServices(): DocInjectable[] {
        return [...this._docServices];
    }

    public get docDirectives(): DocDirective[] {
        return [...this._docDirectives];
    }

    public get docInterfaces(): DocInterface[] {
        return [...this._docInterfaces];
    }

    public get docEnums(): DocEnum[] {
        return [...this._docEnums];
    }

    public get docTypes(): DocTypealias[] {
        return [...this._docTypes];
    }

    private _metaInfo$ = new BehaviorSubject<ComponentMetaInfo>(null);
    private _docModules: DocModule[] = [];
    private _docComponents: DocComponent[] = [];
    private _docServices: DocInjectable[] = [];
    private _docDirectives: DocDirective[] = [];
    private _docInterfaces: DocInterface[] = [];
    private _docEnums: DocEnum[] = [];
    private _docTypes: DocTypealias[] = [];

    constructor(
        private readonly docService: LibDocService
    ) {}

    public ngOnDestroy(): void {
        this._metaInfo$.complete();
    }

    public applyMetaInfo(metaInfo: ComponentMetaInfo): void {
        this.initDocModules(metaInfo);
        this.initDocServices(metaInfo);
        this.initDocDirectives(metaInfo);
        this.initDocComponents(metaInfo);
        this.initDocInterfaces(metaInfo);
        this.initDocEnums(metaInfo);
        this.initDocTypes(metaInfo);

        this._metaInfo$.next(metaInfo);
    }

    private initDocModules({ libModules = [] }: ComponentMetaInfo): void {
        this._docModules = this.docService.findDocModulesByTypes(libModules);
    }

    private initDocServices({ libServices = [] }: ComponentMetaInfo): void {
        this._docServices = this.docService.findDocInjectablesByTypes(libServices);
    }

    private initDocDirectives({ libDirectives = [] }: ComponentMetaInfo): void {
        this._docDirectives = this.docService.findDocDirectivesByTypes(libDirectives);
    }

    private initDocComponents({ libComponents = [] }: ComponentMetaInfo): void {
        this._docComponents = this.docService.findDocComponentsByTypes(libComponents);
    }

    private initDocInterfaces({ libInterfaces = [] }: ComponentMetaInfo): void {
        this._docInterfaces = this.docService.findDocInterfacesByNames(libInterfaces);
    }

    private initDocEnums({ libEnums = [] }: ComponentMetaInfo): void {
        this._docEnums = this.docService.findDocEnumsByNames(libEnums);
    }

    private initDocTypes({ libTypes = [] }: ComponentMetaInfo): void {
        this._docTypes = this.docService.findDocTypesByNames(libTypes);
    }
}
