import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMessageComponent } from './social-message.component';

describe('SocialMessageComponent', () => {
  let component: SocialMessageComponent;
  let fixture: ComponentFixture<SocialMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
