import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSendResultModalComponent } from './report-send-result-modal.component';

describe('ReportSendResultModalComponent', () => {
  let component: ReportSendResultModalComponent;
  let fixture: ComponentFixture<ReportSendResultModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportSendResultModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSendResultModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
