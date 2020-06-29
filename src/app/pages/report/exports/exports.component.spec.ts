import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportExportsComponent } from './exports.component';

describe('ReportExportsComponent', () => {
  let component: ReportExportsComponent;
  let fixture: ComponentFixture<ReportExportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportExportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportExportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
