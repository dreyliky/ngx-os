import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupBoxOverviewComponent } from './group-box-overview.component';

describe('GroupBoxOverviewComponent', () => {
    let component: GroupBoxOverviewComponent;
    let fixture: ComponentFixture<GroupBoxOverviewComponent>;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            declarations: [ GroupBoxOverviewComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GroupBoxOverviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
