import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMessagesComponent } from './messages.component';

describe('SocialMessagesComponent', () => {
  let component: SocialMessagesComponent;
  let fixture: ComponentFixture<SocialMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
