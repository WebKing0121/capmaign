import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataListModalComponent } from './list-modal.component';

describe('DataListModalComponent', () => {
  let component: DataListModalComponent;
  let fixture: ComponentFixture<DataListModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataListModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
