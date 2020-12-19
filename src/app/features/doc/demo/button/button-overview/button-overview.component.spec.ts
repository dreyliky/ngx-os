import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonOverviewComponent } from './button-overview.component';

describe('ButtonOverviewComponent', () => {
  let component: ButtonOverviewComponent;
  let fixture: ComponentFixture<ButtonOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
