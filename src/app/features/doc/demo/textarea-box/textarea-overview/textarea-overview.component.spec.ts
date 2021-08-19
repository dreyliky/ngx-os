import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaOverviewComponent } from './textarea-overview.component';

describe('TextareaOverviewComponent', () => {
    let component: TextareaOverviewComponent;
    let fixture: ComponentFixture<TextareaOverviewComponent>;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            declarations: [ TextareaOverviewComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TextareaOverviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
