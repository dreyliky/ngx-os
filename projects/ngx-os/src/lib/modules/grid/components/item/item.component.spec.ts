import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GridItemComponent } from './item.component';

describe('GridItemComponent', () => {
    let component: GridItemComponent;
    let fixture: ComponentFixture<GridItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ GridItemComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GridItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
