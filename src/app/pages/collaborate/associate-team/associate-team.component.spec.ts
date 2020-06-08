import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateTeamComponent } from './associate-team.component';

describe('AssociateTeamComponent', () => {
  let component: AssociateTeamComponent;
  let fixture: ComponentFixture<AssociateTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociateTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
