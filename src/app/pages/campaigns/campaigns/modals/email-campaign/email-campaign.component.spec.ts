import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailCampaignModalComponent } from './email-campaign.component';

describe('EmailCampaignModalComponent', () => {
  let component: EmailCampaignModalComponent;
  let fixture: ComponentFixture<EmailCampaignModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailCampaignModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailCampaignModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
