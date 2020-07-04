import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMobileAppModalComponent } from './mobile-app.component';

describe('AdminMobileAppModalComponent', () => {
  let component: AdminMobileAppModalComponent;
  let fixture: ComponentFixture<AdminMobileAppModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMobileAppModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMobileAppModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
