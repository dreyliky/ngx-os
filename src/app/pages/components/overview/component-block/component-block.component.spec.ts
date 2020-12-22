import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentBlockComponent } from './component-block.component';

describe('ComponentBlockComponent', () => {
    let component: ComponentBlockComponent;
    let fixture: ComponentFixture<ComponentBlockComponent>;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            declarations: [ ComponentBlockComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ComponentBlockComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
