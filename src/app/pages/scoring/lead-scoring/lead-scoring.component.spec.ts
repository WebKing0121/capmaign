import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadScoringComponent } from './lead-scoring.component';

describe('LeadScoringComponent', () => {
  let component: LeadScoringComponent;
  let fixture: ComponentFixture<LeadScoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadScoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadScoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
