import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRouteEnum } from '@Core/enums';
import {
    ComponentMetaInfo, LibraryComponentsSearchService,
    OsComponentEnum
} from '@Features/documentation';
import { Observable } from 'rxjs';

@Component({
    selector: 'demo-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        LibraryComponentsSearchService
    ]
})
export class GridComponent implements OnInit {
    public filteredComponents$: Observable<ComponentMetaInfo[]>;

    constructor(
        private readonly componentsSearchService: LibraryComponentsSearchService,
        private readonly router: Router
    ) {}

    public ngOnInit(): void {
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
