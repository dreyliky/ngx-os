import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleBarContentComponent } from './title-bar-content.component';

describe('TitleBarContentComponent', () => {
    let component: TitleBarContentComponent;
    let fixture: ComponentFixture<TitleBarContentComponent>;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            declarations: [ TitleBarContentComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TitleBarContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
