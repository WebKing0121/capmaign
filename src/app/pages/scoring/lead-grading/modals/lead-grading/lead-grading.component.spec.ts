import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLeadGradingComponent } from './create-lead-grading.component';

describe('CreateLeadGradingComponent', () => {
  let component: CreateLeadGradingComponent;
  let fixture: ComponentFixture<CreateLeadGradingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLeadGradingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLeadGradingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
