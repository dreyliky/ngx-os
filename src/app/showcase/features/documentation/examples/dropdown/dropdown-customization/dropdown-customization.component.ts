import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ComponentMetaInfoMap } from '../../../data';
import { ComponentMetaInfo } from '../../../interfaces';

@Component({
    selector: 'showcase-dropdown-customization',
    templateUrl: './dropdown-customization.component.html',
    styleUrls: ['./dropdown-customization.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownСustomizationComponent implements OnInit {
    public selectedComponent: ComponentMetaInfo;
    public filteredComponents: ComponentMetaInfo[];
    public pages: number[];
    public activePage = 0;
    public searchString = '';

    private readonly componentCountPerPage = 5;
    private components: ComponentMetaInfo[];

    public ngOnInit(): void {
        this.components = [...ComponentMetaInfoMap.values()];

        this.initPages();
        this.filterComponentsByPage(this.activePage);
    }

    public onPageButtonClick(page: number): void {
        this.activePage = page;

        this.filterComponentsByPage(page);
    }

    public onSearch(event: KeyboardEvent): void {
        const inputElement = event.target as HTMLInputElement;
        this.searchString = inputElement.value.toLowerCase();

        if (this.searchString.length) {
            this.filterComponentsBySearch();
        } else {
            this.filterComponentsByPage(this.activePage);
        }
    }

    public onClearButtonClick(event: MouseEvent): void {
        this.selectedComponent = null;

        event.stopPropagation();
    }

    private filterComponentsByPage(page: number = 0): void {
        const takeFrom = (page * this.componentCountPerPage);
        const takeTo = (takeFrom + this.componentCountPerPage);
        this.filteredComponents = this.components
            .slice(takeFrom, takeTo);
    }

    private filterComponentsBySearch(): void {
        this.filteredComponents = this.components
            .filter((component) => component.name.toLowerCase().includes(this.searchString));
    }

    private initPages(): void {
        const pagesCount = Math.ceil(this.components.length / this.componentCountPerPage);
        this.pages = new Array(pagesCount)
            .fill(0)
            .map((_, index) => index);
    }
}
