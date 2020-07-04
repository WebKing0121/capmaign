import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageTemplateCategoryModalComponent } from './category.component';

describe('LandingPageTemplateCategoryModalComponent', () => {
  let component: LandingPageTemplateCategoryModalComponent;
  let fixture: ComponentFixture<LandingPageTemplateCategoryModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingPageTemplateCategoryModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageTemplateCategoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
