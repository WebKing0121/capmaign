import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrganizationModalComponent } from './organization-modal.component';

describe('AdminOrganizationModalComponent', () => {
  let component: AdminOrganizationModalComponent;
  let fixture: ComponentFixture<AdminOrganizationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOrganizationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrganizationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
