import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentPropertyComponent } from './component-property.component';

describe('ComponentPropertyComponent', () => {
  let component: ComponentPropertyComponent;
  let fixture: ComponentFixture<ComponentPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentPropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
