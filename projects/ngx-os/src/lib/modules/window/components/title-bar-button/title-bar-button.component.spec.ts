import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleBarButtonComponent } from './title-bar-button.component';

describe('TitleBarButtonComponent', () => {
  let component: TitleBarButtonComponent;
  let fixture: ComponentFixture<TitleBarButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitleBarButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleBarButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
