import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesApiComponent } from './classes-api.component';

describe('ClassesApiComponent', () => {
  let component: ClassesApiComponent;
  let fixture: ComponentFixture<ClassesApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassesApiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassesApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
