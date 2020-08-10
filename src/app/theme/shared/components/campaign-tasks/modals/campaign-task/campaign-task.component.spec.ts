import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignTasksTaskModalComponent } from './campaign-task.component';

describe('CampaignTasksTaskModalComponent', () => {
  let component: CampaignTasksTaskModalComponent;
  let fixture: ComponentFixture<CampaignTasksTaskModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignTasksTaskModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignTasksTaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
