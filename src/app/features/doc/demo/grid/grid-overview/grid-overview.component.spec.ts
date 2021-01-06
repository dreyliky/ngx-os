import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridOverviewComponent } from './grid-overview.component';

describe('GridOverviewComponent', () => {
    let component: GridOverviewComponent;
    let fixture: ComponentFixture<GridOverviewComponent>;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            declarations: [ GridOverviewComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GridOverviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
