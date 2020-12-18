import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentLayoutComponent } from './component-layout.component';

describe('ComponentLayoutComponent', () => {
  let component: ComponentLayoutComponent;
  let fixture: ComponentFixture<ComponentLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
