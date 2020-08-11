import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoringLeadTimeframesComponent } from './lead-timeframes.component';

describe('ScoringLeadTimeframesComponent', () => {
  let component: ScoringLeadTimeframesComponent;
  let fixture: ComponentFixture<ScoringLeadTimeframesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoringLeadTimeframesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoringLeadTimeframesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
