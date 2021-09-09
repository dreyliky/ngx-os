import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabGroupOverviewComponent } from './tab-group-overview.component';

describe('TabGroupOverviewComponent', () => {
    let component: TabGroupOverviewComponent;
    let fixture: ComponentFixture<TabGroupOverviewComponent>;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            declarations: [ TabGroupOverviewComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TabGroupOverviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
