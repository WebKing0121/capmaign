import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaborateAssignCampaignModalComponent } from './assign-campaign-modal.component';

describe('CollaborateAssignCampaignModalComponent', () => {
  let component: CollaborateAssignCampaignModalComponent;
  let fixture: ComponentFixture<CollaborateAssignCampaignModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollaborateAssignCampaignModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaborateAssignCampaignModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
