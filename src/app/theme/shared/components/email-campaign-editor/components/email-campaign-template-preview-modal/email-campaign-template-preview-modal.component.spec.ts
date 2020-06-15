import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailCampaignTemplatePreviewModalComponent } from './email-campaign-template-preview-modal.component';

describe('EmailCampaignTemplatePreviewModalComponent', () => {
  let component: EmailCampaignTemplatePreviewModalComponent;
  let fixture: ComponentFixture<EmailCampaignTemplatePreviewModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailCampaignTemplatePreviewModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailCampaignTemplatePreviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
