import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldRowOverviewComponent } from './field-row-overview.component';

describe('FieldRowOverviewComponent', () => {
    let component: FieldRowOverviewComponent;
    let fixture: ComponentFixture<FieldRowOverviewComponent>;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            declarations: [ FieldRowOverviewComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FieldRowOverviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
