import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLeadScoringComponent } from './create-lead-scoring.component';

describe('CreateLeadScoringComponent', () => {
  let component: CreateLeadScoringComponent;
  let fixture: ComponentFixture<CreateLeadScoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLeadScoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLeadScoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
