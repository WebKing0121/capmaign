import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewColumnsComponent } from './view-columns.component';

describe('ViewColumnsComponent', () => {
  let component: ViewColumnsComponent;
  let fixture: ComponentFixture<ViewColumnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewColumnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
