import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrganizationSelectUserModalComponent } from './select-user-modal.component';

describe('AdminOrganizationSelectUserModalComponent', () => {
  let component: AdminOrganizationSelectUserModalComponent;
  let fixture: ComponentFixture<AdminOrganizationSelectUserModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOrganizationSelectUserModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrganizationSelectUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
