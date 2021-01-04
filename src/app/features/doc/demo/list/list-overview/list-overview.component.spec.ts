import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOverviewComponent } from './list-overview.component';

describe('ListOverviewComponent', () => {
  let component: ListOverviewComponent;
  let fixture: ComponentFixture<ListOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
