import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadCategoryComponent } from './lead-category.component';

describe('LeadCategoryComponent', () => {
  let component: LeadCategoryComponent;
  let fixture: ComponentFixture<LeadCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
