import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSmsCampaignsComponent } from './manage-sms-campaign.component';

describe('MobileSmsCampaignsComponent', () => {
  let component: MobileSmsCampaignsComponent;
  let fixture: ComponentFixture<MobileSmsCampaignsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileSmsCampaignsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileSmsCampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
