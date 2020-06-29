import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSmsCampaignComponent } from './sms-campaign.component';

describe('ReportSmsCampaignComponent', () => {
  let component: ReportSmsCampaignComponent;
  let fixture: ComponentFixture<ReportSmsCampaignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportSmsCampaignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSmsCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
