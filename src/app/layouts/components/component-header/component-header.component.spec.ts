import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentHeaderComponent } from './component-header.component';

describe('ComponentHeaderComponent', () => {
  let component: ComponentHeaderComponent;
  let fixture: ComponentFixture<ComponentHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
