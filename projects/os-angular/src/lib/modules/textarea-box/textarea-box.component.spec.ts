import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaBoxComponent } from './textarea-box.component';

describe('TextareaBoxComponent', () => {
  let component: TextareaBoxComponent;
  let fixture: ComponentFixture<TextareaBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextareaBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
