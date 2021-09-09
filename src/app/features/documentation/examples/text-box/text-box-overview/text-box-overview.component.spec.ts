import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextBoxOverviewComponent } from './text-box-overview.component';

describe('TextBoxOverviewComponent', () => {
    let component: TextBoxOverviewComponent;
    let fixture: ComponentFixture<TextBoxOverviewComponent>;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            declarations: [ TextBoxOverviewComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TextBoxOverviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
