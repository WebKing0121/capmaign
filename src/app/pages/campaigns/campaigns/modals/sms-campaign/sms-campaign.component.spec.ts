import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsCampaignModalComponent } from './sms-campaign.component';

describe('SmsCampaignModalComponent', () => {
  let component: SmsCampaignModalComponent;
  let fixture: ComponentFixture<SmsCampaignModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsCampaignModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsCampaignModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
