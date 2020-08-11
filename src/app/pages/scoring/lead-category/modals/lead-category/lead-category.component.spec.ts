import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoringLeadCategoryModalComponent } from './lead-category.component';

describe('ScoringLeadCategoryModalComponent', () => {
  let component: ScoringLeadCategoryModalComponent;
  let fixture: ComponentFixture<ScoringLeadCategoryModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoringLeadCategoryModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoringLeadCategoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
