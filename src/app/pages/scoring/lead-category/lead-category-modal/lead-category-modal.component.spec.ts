import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadCategoryModalComponent } from './lead-category-modal.component';

describe('LeadCategoryModalComponent', () => {
  let component: LeadCategoryModalComponent;
  let fixture: ComponentFixture<LeadCategoryModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadCategoryModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadCategoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
