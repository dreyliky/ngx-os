import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleBarIconComponent } from './title-bar-icon.component';

describe('TitleBarIconComponent', () => {
    let component: TitleBarIconComponent;
    let fixture: ComponentFixture<TitleBarIconComponent>;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            declarations: [ TitleBarIconComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TitleBarIconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
