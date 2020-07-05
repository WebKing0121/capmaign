import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportImportsComponent } from './imports.component';

describe('ReportImportsComponent', () => {
  let component: ReportImportsComponent;
  let fixture: ComponentFixture<ReportImportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportImportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportImportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
