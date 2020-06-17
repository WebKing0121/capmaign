import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableColumnsMenuComponent } from './datatable-columns-menu.component';

describe('DatatableColumnsMenuComponent', () => {
  let component: DatatableColumnsMenuComponent;
  let fixture: ComponentFixture<DatatableColumnsMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatableColumnsMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatableColumnsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
