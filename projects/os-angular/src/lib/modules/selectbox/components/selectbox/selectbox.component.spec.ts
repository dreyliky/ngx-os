import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectboxComponent } from './selectbox.component';

describe('SelectboxComponent', () => {
    let component: SelectboxComponent<any>;
    let fixture: ComponentFixture<SelectboxComponent<any>>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SelectboxComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectboxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
