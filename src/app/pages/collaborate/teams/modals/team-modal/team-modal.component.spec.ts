import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaborateTeamModalComponent } from './team-modal.component';

describe('CollaborateTeamModalComponent', () => {
  let component: CollaborateTeamModalComponent;
  let fixture: ComponentFixture<CollaborateTeamModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollaborateTeamModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaborateTeamModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
