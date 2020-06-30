import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDateRangeModalComponent } from './report-date-range-modal.component';

describe('ReportDateRangeModalComponent', () => {
  let component: ReportDateRangeModalComponent;
  let fixture: ComponentFixture<ReportDateRangeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportDateRangeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDateRangeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
