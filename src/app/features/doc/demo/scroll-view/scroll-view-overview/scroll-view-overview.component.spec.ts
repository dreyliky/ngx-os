import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollViewOverviewComponent } from './scroll-view-overview.component';

describe('ScrollViewOverviewComponent', () => {
    let component: ScrollViewOverviewComponent;
    let fixture: ComponentFixture<ScrollViewOverviewComponent>;

    beforeEach(async() => {
        await TestBed.configureTestingModule({
            declarations: [ ScrollViewOverviewComponent ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ScrollViewOverviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
