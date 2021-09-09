import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderOverviewComponent } from './slider-overview.component';

describe('SliderOverviewComponent', () => {
    let component: SliderOverviewComponent;
    let fixture: ComponentFixture<SliderOverviewComponent>;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            declarations: [ SliderOverviewComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SliderOverviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
