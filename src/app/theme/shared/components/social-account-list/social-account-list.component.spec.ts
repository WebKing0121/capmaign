import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialAccountListComponent } from './social-account-list.component';

describe('SocialAccountListComponent', () => {
  let component: SocialAccountListComponent;
  let fixture: ComponentFixture<SocialAccountListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialAccountListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialAccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
