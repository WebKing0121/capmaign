import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataEventsComponent } from './data-events.component';

describe('DataEventsComponent', () => {
  let component: DataEventsComponent;
  let fixture: ComponentFixture<DataEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
