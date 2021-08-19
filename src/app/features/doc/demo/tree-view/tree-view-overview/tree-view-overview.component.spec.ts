import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeViewOverviewComponent } from './tree-view-overview.component';

describe('TreeViewOverviewComponent', () => {
    let component: TreeViewOverviewComponent;
    let fixture: ComponentFixture<TreeViewOverviewComponent>;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            declarations: [ TreeViewOverviewComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TreeViewOverviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
