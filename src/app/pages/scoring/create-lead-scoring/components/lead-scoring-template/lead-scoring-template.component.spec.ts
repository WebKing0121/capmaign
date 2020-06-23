import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadScoringTemplateComponent } from './lead-scoring-template.component';

describe('LeadScoringTemplateComponent', () => {
  let component: LeadScoringTemplateComponent;
  let fixture: ComponentFixture<LeadScoringTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadScoringTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadScoringTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
