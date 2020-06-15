import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailCampaignPreviewModalComponent } from './email-campaign-preview-modal.component';

describe('EmailCampaignPreviewModalComponent', () => {
  let component: EmailCampaignPreviewModalComponent;
  let fixture: ComponentFixture<EmailCampaignPreviewModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailCampaignPreviewModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailCampaignPreviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
