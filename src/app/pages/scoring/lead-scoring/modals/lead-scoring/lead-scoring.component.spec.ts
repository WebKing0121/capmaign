import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoringLeadScoringModalComponent } from './lead-scoring.component';

describe('ScoringLeadScoringModalComponent', () => {
  let component: ScoringLeadScoringModalComponent;
  let fixture: ComponentFixture<ScoringLeadScoringModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoringLeadScoringModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoringLeadScoringModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
