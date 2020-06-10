import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignSubTasksComponent } from './campaign-sub-tasks.component';

describe('CampaignSubTasksComponent', () => {
  let component: CampaignSubTasksComponent;
  let fixture: ComponentFixture<CampaignSubTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignSubTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignSubTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
