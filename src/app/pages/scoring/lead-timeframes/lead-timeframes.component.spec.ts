import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadTimeframesComponent } from './lead-timeframes.component';

describe('LeadTimeframesComponent', () => {
  let component: LeadTimeframesComponent;
  let fixture: ComponentFixture<LeadTimeframesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadTimeframesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadTimeframesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
