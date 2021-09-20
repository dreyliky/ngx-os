import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicWindowComponent } from './dynamic-window.component';

describe('DynamicWindowComponent', () => {
    let component: DynamicWindowComponent;
    let fixture: ComponentFixture<DynamicWindowComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ DynamicWindowComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DynamicWindowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
