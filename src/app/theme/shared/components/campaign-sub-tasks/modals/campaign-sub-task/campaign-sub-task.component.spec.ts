import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignTasksSubTaskModalComponent } from './campaign-sub-task.component';

describe('CampaignTasksSubTaskModalComponent', () => {
  let component: CampaignTasksSubTaskModalComponent;
  let fixture: ComponentFixture<CampaignTasksSubTaskModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignTasksSubTaskModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignTasksSubTaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
