import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatablePaginationComponent } from './datatable-pagination.component';

describe('DatatablePaginationComponent', () => {
  let component: DatatablePaginationComponent;
  let fixture: ComponentFixture<DatatablePaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatablePaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatablePaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
