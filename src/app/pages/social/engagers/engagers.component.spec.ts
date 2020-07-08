import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialEngagersComponent } from './engagers.component';

describe('SocialEngagersComponent', () => {
  let component: SocialEngagersComponent;
  let fixture: ComponentFixture<SocialEngagersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialEngagersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialEngagersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
