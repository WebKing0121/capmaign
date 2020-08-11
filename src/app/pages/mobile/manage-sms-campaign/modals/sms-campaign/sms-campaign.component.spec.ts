import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSmsCampaignModalComponent } from './sms-campaign.component';

describe('MobileSmsCampaignModalComponent', () => {
  let component: MobileSmsCampaignModalComponent;
  let fixture: ComponentFixture<MobileSmsCampaignModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileSmsCampaignModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileSmsCampaignModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
