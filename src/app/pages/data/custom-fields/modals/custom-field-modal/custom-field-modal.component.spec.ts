import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCustomFieldModalComponent } from './custom-field-modal.component';

describe('DataCustomFieldModalComponent', () => {
  let component: DataCustomFieldModalComponent;
  let fixture: ComponentFixture<DataCustomFieldModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataCustomFieldModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataCustomFieldModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
