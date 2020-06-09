import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignTasksComponent } from './campaign-tasks.component';

describe('CampaignTasksComponent', () => {
  let component: CampaignTasksComponent;
  let fixture: ComponentFixture<CampaignTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
