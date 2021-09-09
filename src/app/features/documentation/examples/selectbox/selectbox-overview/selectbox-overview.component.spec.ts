import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectboxOverviewComponent } from './selectbox-overview.component';

describe('SelectboxOverviewComponent', () => {
    let component: SelectboxOverviewComponent;
    let fixture: ComponentFixture<SelectboxOverviewComponent>;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            declarations: [ SelectboxOverviewComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectboxOverviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
