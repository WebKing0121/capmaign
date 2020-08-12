import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileInAppMessagesComponent } from './in-app-messages.component';

describe('InAppMessageComponent', () => {
  let component: MobileInAppMessagesComponent;
  let fixture: ComponentFixture<MobileInAppMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileInAppMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileInAppMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
