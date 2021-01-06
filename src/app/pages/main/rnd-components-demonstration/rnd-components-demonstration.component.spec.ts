import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RndComponentsDemonstrationComponent } from './rnd-components-demonstration.component';

describe('RndComponentsDemonstrationComponent', () => {
  let component: RndComponentsDemonstrationComponent;
  let fixture: ComponentFixture<RndComponentsDemonstrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RndComponentsDemonstrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RndComponentsDemonstrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
