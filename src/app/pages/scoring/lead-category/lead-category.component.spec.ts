import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoringLeadCategoryComponent } from './lead-category.component';

describe('ScoringLeadCategoryComponent', () => {
  let component: ScoringLeadCategoryComponent;
  let fixture: ComponentFixture<ScoringLeadCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoringLeadCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoringLeadCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
