import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailBoxValidityOverviewComponent } from './email-box-validity-overview.component';

describe('EmailBoxValidityOverviewComponent', () => {
  let component: EmailBoxValidityOverviewComponent;
  let fixture: ComponentFixture<EmailBoxValidityOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailBoxValidityOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailBoxValidityOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
