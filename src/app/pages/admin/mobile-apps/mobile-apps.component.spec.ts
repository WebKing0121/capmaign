import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMobileAppsComponent } from './mobile-apps.component';

describe('AdminMobileAppsComponent', () => {
  let component: AdminMobileAppsComponent;
  let fixture: ComponentFixture<AdminMobileAppsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMobileAppsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMobileAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
