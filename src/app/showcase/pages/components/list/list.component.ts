import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppRouteEnum } from '@core/enums';
import {
    ComponentMetaInfo, LibraryComponentsSearchService,
    OsComponentEnum
} from '@features/documentation';
import { GridDirectionEnum } from 'ngx-os/modules';
import { Observable } from 'rxjs';

@Component({
    selector: 'showcase-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        LibraryComponentsSearchService
    ]
})
export class GridComponent implements OnInit {
    public gridDirection = GridDirectionEnum.Horizontal;
    public filteredComponents$: Observable<ComponentMetaInfo[]>;

    constructor(
        private readonly titleService: Title,
        private readonly componentsSearchService: LibraryComponentsSearchService,
        private readonly router: Router
    ) {}

    public ngOnInit(): void {
        this.titleService.setTitle('ngx-os - Components');
        this.filteredComponents$ = this.componentsSearchService.filteredComponents$;
    }

    public onSearch(event: KeyboardEvent): void {
        const inputElement = event.target as HTMLInputElement;

        this.componentsSearchService.search(inputElement.value);
    }

    public onOpenSectionButtonClick(componentType: OsComponentEnum): void {
        this.router.navigateByUrl(`/${AppRouteEnum.Components}/${componentType}`);
    }
}
