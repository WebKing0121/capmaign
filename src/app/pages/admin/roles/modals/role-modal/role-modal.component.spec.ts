import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRoleModalComponent } from './role-modal.component';

describe('AdminRoleModalComponent', () => {
  let component: AdminRoleModalComponent;
  let fixture: ComponentFixture<AdminRoleModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRoleModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRoleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
