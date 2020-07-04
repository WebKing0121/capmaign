import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicContentModalComponent } from './dynamic-content.component';

describe('DynamicContentModalComponent', () => {
  let component: DynamicContentModalComponent;
  let fixture: ComponentFixture<DynamicContentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicContentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicContentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
