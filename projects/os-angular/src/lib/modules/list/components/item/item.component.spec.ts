import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListItemComponent } from './item.component';

describe('ListItemComponent', () => {
    let component: ListItemComponent<any>;
    let fixture: ComponentFixture<ListItemComponent<any>>;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            declarations: [ ListItemComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ListItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
