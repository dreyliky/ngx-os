import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowOverviewComponent } from './window-overview.component';

describe('WindowOverviewComponent', () => {
    let component: WindowOverviewComponent;
    let fixture: ComponentFixture<WindowOverviewComponent>;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            declarations: [ WindowOverviewComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WindowOverviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
