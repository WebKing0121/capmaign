import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCustomFieldsComponent } from './custom-fields.component';

describe('DataCustomFieldsComponent', () => {
  let component: DataCustomFieldsComponent;
  let fixture: ComponentFixture<DataCustomFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataCustomFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataCustomFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
