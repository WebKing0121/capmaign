import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFilterModalComponent } from './filter-modal.component';

describe('DataFilterModalComponent', () => {
  let component: DataFilterModalComponent;
  let fixture: ComponentFixture<DataFilterModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataFilterModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataFilterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
