import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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

@Component({
    selector: 'demo-api',
    templateUrl: './api.component.html',
    styleUrls: ['./api.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApiComponent implements OnChanges {
    @Input()
    public readonly metaInfo: ComponentMetaInfo;

    public modules: DocModule[] = [];
    public components: DocComponent[] = [];
    public services: DocInjectable[] = [];
    public directives: DocDirective[] = [];
    public interfaces: DocInterface[] = [];
    public enums: DocEnum[] = [];
    public types: DocTypealias[] = [];

    constructor(
        private readonly docService: LibDocService
    ) {}

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.metaInfo.currentValue !== changes.metaInfo.previousValue) {
            this.initDocModules();
            this.initDocServices();
            this.initDocDirectives();
            this.initDocComponents();
            this.initDocInterfaces();
            this.initDocEnums();
            this.initDocTypes();
        }
    }

    private initDocModules(): void {
        if (this.metaInfo.libModules) {
            this.modules = this.docService.findDocModulesByTypes(this.metaInfo.libModules);
        } else {
            this.modules = [];
        }
    }

    private initDocServices(): void {
        if (this.metaInfo.libServices) {
            this.services = this.docService.findDocInjectablesByTypes(this.metaInfo.libServices);
        } else {
            this.services = [];
        }
    }

    private initDocDirectives(): void {
        if (this.metaInfo.libDirectives) {
            this.directives = this.docService.findDocDirectivesByTypes(this.metaInfo.libDirectives);
        } else {
            this.directives = [];
        }
    }

    private initDocComponents(): void {
        if (this.metaInfo.libComponents) {
            this.components = this.docService.findDocComponentsByTypes(this.metaInfo.libComponents);
        } else {
            this.components = [];
        }
    }

    private initDocInterfaces(): void {
        if (this.metaInfo.libInterfaces) {
            this.interfaces = this.docService.findDocInterfacesByNames(this.metaInfo.libInterfaces);
        } else {
            this.interfaces = [];
        }
    }

    private initDocEnums(): void {
        if (this.metaInfo.libEnums) {
            this.enums = this.docService.findDocEnumsByNames(this.metaInfo.libEnums);
        } else {
            this.enums = [];
        }
    }

    private initDocTypes(): void {
        if (this.metaInfo.libTypes) {
            this.types = this.docService.findDocTypesByNames(this.metaInfo.libTypes);
        } else {
            this.types = [];
        }
    }
}
