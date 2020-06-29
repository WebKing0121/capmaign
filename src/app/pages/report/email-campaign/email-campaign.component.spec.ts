import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportEmailCampaignComponent } from './email-campaign.component';

describe('ReportEmailCampaignComponent', () => {
  let component: ReportEmailCampaignComponent;
  let fixture: ComponentFixture<ReportEmailCampaignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportEmailCampaignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportEmailCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
