import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSenderModalComponent } from './sender-modal.component';

describe('AdminSenderModalComponent', () => {
  let component: AdminSenderModalComponent;
  let fixture: ComponentFixture<AdminSenderModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminSenderModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSenderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
