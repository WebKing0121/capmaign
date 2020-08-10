import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignSendModalComponent } from './campaign-send-modal.component';

describe('CampaignSendModalComponent', () => {
  let component: CampaignSendModalComponent;
  let fixture: ComponentFixture<CampaignSendModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignSendModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignSendModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
