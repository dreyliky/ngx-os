import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxOverviewComponent } from './checkbox-overview.component';

describe('CheckboxOverviewComponent', () => {
    let component: CheckboxOverviewComponent;
    let fixture: ComponentFixture<CheckboxOverviewComponent>;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            declarations: [ CheckboxOverviewComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CheckboxOverviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
