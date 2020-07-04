import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSendersComponent } from './senders.component';

describe('AdminSendersComponent', () => {
  let component: AdminSendersComponent;
  let fixture: ComponentFixture<AdminSendersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSendersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
