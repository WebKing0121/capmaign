import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataRecordsComponent } from './records.component';

describe('DataRecordsComponent', () => {
  let component: DataRecordsComponent;
  let fixture: ComponentFixture<DataRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
