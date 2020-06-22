import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadGradingComponent } from './lead-grading.component';

describe('LeadGradingComponent', () => {
  let component: LeadGradingComponent;
  let fixture: ComponentFixture<LeadGradingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadGradingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadGradingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
