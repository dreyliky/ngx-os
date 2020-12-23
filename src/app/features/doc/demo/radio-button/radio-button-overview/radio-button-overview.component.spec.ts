import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioButtonOverviewComponent } from './radio-button-overview.component';

describe('RadioButtonOverviewComponent', () => {
  let component: RadioButtonOverviewComponent;
  let fixture: ComponentFixture<RadioButtonOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadioButtonOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioButtonOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
