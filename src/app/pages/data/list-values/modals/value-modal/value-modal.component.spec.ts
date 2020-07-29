import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataListValueModalComponent } from './value-modal.component';

describe('DataListValueModalComponent', () => {
  let component: DataListValueModalComponent;
  let fixture: ComponentFixture<DataListValueModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataListValueModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataListValueModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
