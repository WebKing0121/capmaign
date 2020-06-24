import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataRecordTabsComponent } from './data-record-tabs.component';

describe('DataRecordTabsComponent', () => {
  let component: DataRecordTabsComponent;
  let fixture: ComponentFixture<DataRecordTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataRecordTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataRecordTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
