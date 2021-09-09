import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormFieldOverviewComponent } from './field-row-overview.component';


describe('FieldRowOverviewComponent', () => {
    let component: FormFieldOverviewComponent;
    let fixture: ComponentFixture<FormFieldOverviewComponent>;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            declarations: [ FormFieldOverviewComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FormFieldOverviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
