import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleBarControlsComponent } from './title-bar-controls.component';

describe('TitleBarControlsComponent', () => {
    let component: TitleBarControlsComponent;
    let fixture: ComponentFixture<TitleBarControlsComponent>;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            declarations: [ TitleBarControlsComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TitleBarControlsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
