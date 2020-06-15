import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailCampaignTemplateModalComponent } from './email-campaign-template-modal.component';

describe('EmailCampaignTemplateModalComponent', () => {
  let component: EmailCampaignTemplateModalComponent;
  let fixture: ComponentFixture<EmailCampaignTemplateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailCampaignTemplateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailCampaignTemplateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
