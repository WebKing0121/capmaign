import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrganizationModalComponent } from './organization.component';

describe('UserOrganizationModalComponent', () => {
  let component: UserOrganizationModalComponent;
  let fixture: ComponentFixture<UserOrganizationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserOrganizationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserOrganizationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
