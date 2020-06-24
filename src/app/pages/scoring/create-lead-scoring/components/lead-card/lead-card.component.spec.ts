import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadCardComponent } from './lead-card.component';

describe('LeadScoringTemplateComponent', () => {
  let component: LeadCardComponent;
  let fixture: ComponentFixture<LeadCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
