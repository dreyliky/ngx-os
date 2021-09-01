import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
    ComponentMetaInfo,
    DocComponent,
    DocDirective,
    DocInjectable,
    DocInterface,
    DocModule,
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
}
