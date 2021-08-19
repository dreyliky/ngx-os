import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextOverviewComponent } from './text-overview.component';

describe('TextOverviewComponent', () => {
    let component: TextOverviewComponent;
    let fixture: ComponentFixture<TextOverviewComponent>;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            declarations: [ TextOverviewComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TextOverviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
