import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaborateAssignTeamModalComponent } from './assign-team-modal.component';

describe('CollaborateAssignTeamModalComponent', () => {
  let component: CollaborateAssignTeamModalComponent;
  let fixture: ComponentFixture<CollaborateAssignTeamModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollaborateAssignTeamModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaborateAssignTeamModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
