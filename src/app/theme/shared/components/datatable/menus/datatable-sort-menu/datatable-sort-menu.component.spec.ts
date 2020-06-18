import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableSortMenuComponent } from './datatable-sort-menu.component';

describe('DatatableSortMenuComponent', () => {
  let component: DatatableSortMenuComponent;
  let fixture: ComponentFixture<DatatableSortMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatableSortMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatableSortMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
