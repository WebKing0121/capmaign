import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialPolicyComponent } from './social-policy.component';

describe('SocialPolicyComponent', () => {
  let component: SocialPolicyComponent;
  let fixture: ComponentFixture<SocialPolicyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialPolicyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
