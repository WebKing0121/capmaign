import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicContentsComponent } from './dynamic-contents.component';

describe('DynamicContentsComponent', () => {
  let component: DynamicContentsComponent;
  let fixture: ComponentFixture<DynamicContentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicContentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
