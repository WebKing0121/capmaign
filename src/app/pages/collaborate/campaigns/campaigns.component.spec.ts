import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaborateCampaignsComponent } from './campaigns.component';

describe('CollaborateCampaignsComponent', () => {
  let component: CollaborateCampaignsComponent;
  let fixture: ComponentFixture<CollaborateCampaignsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollaborateCampaignsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaborateCampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
