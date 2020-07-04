import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentCategoriesComponent } from './categories.component';

describe('ContentCategoriesComponent', () => {
  let component: ContentCategoriesComponent;
  let fixture: ComponentFixture<ContentCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
