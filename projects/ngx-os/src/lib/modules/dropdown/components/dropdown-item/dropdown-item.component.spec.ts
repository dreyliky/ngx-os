import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownItemComponent } from './dropdown-item.component';

describe('OptionComponent', () => {
    let component: DropdownItemComponent<any>;
    let fixture: ComponentFixture<DropdownItemComponent<any>>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ DropdownItemComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DropdownItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
