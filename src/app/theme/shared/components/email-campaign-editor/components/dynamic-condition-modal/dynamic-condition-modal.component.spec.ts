import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicConditionModalComponent } from './dynamic-condition-modal.component';

describe('DynamicConditionModalComponent', () => {
  let component: DynamicConditionModalComponent;
  let fixture: ComponentFixture<DynamicConditionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicConditionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicConditionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
