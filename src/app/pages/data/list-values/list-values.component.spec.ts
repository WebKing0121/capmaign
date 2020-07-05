import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataListValuesComponent } from './list-values.component';

describe('DataListValuesComponent', () => {
  let component: DataListValuesComponent;
  let fixture: ComponentFixture<DataListValuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataListValuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataListValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
