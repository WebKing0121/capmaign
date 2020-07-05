import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentCategoryModalComponent } from './category.component';

describe('ContentCategoryModalComponent', () => {
  let component: ContentCategoryModalComponent;
  let fixture: ComponentFixture<ContentCategoryModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentCategoryModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentCategoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
