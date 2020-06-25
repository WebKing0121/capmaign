import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSmsCampaignComponent } from './manage-sms-campaign.component';

describe('ManageSmsCampaignComponent', () => {
  let component: ManageSmsCampaignComponent;
  let fixture: ComponentFixture<ManageSmsCampaignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSmsCampaignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSmsCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
